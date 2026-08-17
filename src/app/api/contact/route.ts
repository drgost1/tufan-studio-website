import { NextRequest } from "next/server";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/constants";

/**
 * Contact / quotation endpoint.
 *
 * Delivery runs over the Resend HTTP API. PHP-style mail() or SMTP is not an
 * option on this box: there is no MTA, and mail sent straight from a bare VPS
 * IP with no SPF/DKIM lands in spam. Resend sends from an already-verified
 * domain, so the lead arrives authenticated.
 *
 * `reply_to` is the person who filled in the form, so hitting Reply in Gmail
 * answers the lead rather than the sending domain.
 */

const MAIL_TO = process.env.CONTACT_MAIL_TO ?? "info@tufanstudio.net";
const MAIL_FROM = process.env.CONTACT_MAIL_FROM ?? "Tufan Studio <noreply@yopekka.com>";

const LIMIT_PER_WINDOW = 5;
const WINDOW_MS = 60 * 60 * 1000;

const MAX_LENGTHS = {
  name: 80,
  email: 254,
  company: 120,
  message: 4000,
} as const;

/**
 * In-memory limiter. The site runs as a single long-lived Node process, so one
 * Map covers every request; a restart resets the counters, which is an
 * acceptable trade for keeping zero storage dependencies on a brochure site.
 */
const hits = new Map<string, number[]>();

function rateLimitAllows(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((time) => time >= windowStart);

  if (recent.length >= LIMIT_PER_WINDOW) {
    hits.set(ip, recent);
    return false;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Nothing else reclaims these entries, so sweep expired IPs occasionally.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((time) => time < windowStart)) hits.delete(key);
    }
  }

  return true;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

/** Strips CR/LF so user input can never inject extra mail headers. */
function sanitizeHeaderValue(value: string): string {
  return value.replace(/[\r\n]/g, "").trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Lead = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

function validate(body: Record<string, unknown>): { lead: Lead } | { error: string } {
  const read = (key: string) => (typeof body[key] === "string" ? (body[key] as string).trim() : "");

  const name = read("name");
  const email = read("email");
  const company = read("company");
  const projectType = read("projectType");
  const budget = read("budget");
  const message = read("message");

  if (name.length < 2 || name.length > MAX_LENGTHS.name) {
    return { error: "Please enter your name." };
  }
  // Deliberately loose — the only address that matters is one Resend accepts
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > MAX_LENGTHS.email) {
    return { error: "Please enter a valid email address." };
  }
  if (company.length > MAX_LENGTHS.company) {
    return { error: "Company name is too long." };
  }
  if (!PROJECT_TYPES.includes(projectType as (typeof PROJECT_TYPES)[number])) {
    return { error: "Please pick what this is about." };
  }
  if (budget !== "" && !BUDGET_RANGES.includes(budget as (typeof BUDGET_RANGES)[number])) {
    return { error: "Please pick a valid budget range." };
  }
  if (message.length < 10 || message.length > MAX_LENGTHS.message) {
    return { error: "Tell us a bit more — at least 10 characters." };
  }

  return { lead: { name, email, company, projectType, budget, message } };
}

function buildHtml(lead: Lead, ip: string): string {
  const row = (label: string, value: string) =>
    `<p style="margin:0 0 10px"><strong>${label}:</strong> ${escapeHtml(value)}</p>`;

  return (
    '<html><body style="font-family:system-ui,sans-serif;color:#111;line-height:1.5">' +
    '<h2 style="margin:0 0 16px;color:#E63946">New Tufan Studio enquiry</h2>' +
    row("Name", lead.name) +
    row("Email", lead.email) +
    (lead.company ? row("Company / Server", lead.company) : "") +
    row("About", lead.projectType) +
    (lead.budget ? row("Budget", lead.budget) : "") +
    '<p style="margin:16px 0 6px"><strong>Message:</strong></p>' +
    `<div style="white-space:pre-wrap;padding:12px;background:#f6f6f6;border-left:3px solid #E63946">${escapeHtml(lead.message)}</div>` +
    `<p style="color:#777;font-size:12px;margin-top:20px">Sent from ${escapeHtml(ip)} via tufanstudio.net</p>` +
    "</body></html>"
  );
}

async function deliver(lead: Lead, ip: string): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set — nothing was delivered");
    return false;
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: MAIL_FROM,
        to: [MAIL_TO],
        reply_to: sanitizeHeaderValue(lead.email),
        subject: sanitizeHeaderValue(`Tufan Studio — ${lead.projectType} — ${lead.name}`),
        html: buildHtml(lead, ip),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      // Body carries the real reason (unverified domain, bad key). Logged only.
      const detail = await response.text().catch(() => "");
      console.error(`[contact] resend failed: HTTP ${response.status} ${detail.slice(0, 300)}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("[contact] resend threw:", error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip = clientIp(request);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot — real users never see or fill this field
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ success: true });
  }

  const result = validate(body);
  if ("error" in result) {
    return Response.json({ success: false, error: result.error }, { status: 422 });
  }

  if (!rateLimitAllows(ip)) {
    return Response.json(
      { success: false, error: "Too many messages from this connection. Try again later." },
      { status: 429 },
    );
  }

  // Logged before delivery so a lead survives in journalctl even if Resend is down
  console.log(`[contact] lead ${JSON.stringify({ ...result.lead, ip })}`);

  const delivered = await deliver(result.lead, ip);
  if (!delivered) {
    return Response.json(
      {
        success: false,
        error: `Could not send right now. Please email ${MAIL_TO} directly.`,
      },
      { status: 502 },
    );
  }

  return Response.json({ success: true });
}
