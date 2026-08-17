"use client";

import { useEffect, useState } from "react";
import { PROJECT_TYPES, BUDGET_RANGES, CONTACT_EMAIL } from "@/lib/constants";

type Status = "idle" | "sending" | "sent" | "error";

const FIELD_CLASS =
  "w-full rounded-xl bg-storm-dark/80 border border-white/10 px-4 py-3 text-sm text-storm-light " +
  "placeholder:text-storm-muted/50 outline-none transition-all duration-300 " +
  "focus:border-storm-red/60 focus:bg-storm-dark focus:shadow-[0_0_0_3px_rgba(230,57,70,0.12)]";

const LABEL_CLASS =
  "block text-[11px] tracking-[0.18em] uppercase text-storm-muted mb-2 font-medium";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [projectType, setProjectType] = useState<string>(PROJECT_TYPES[0]);

  // The "Join The Pack" card deep-links here — honour ?type= on arrival so the
  // dropdown already says what the visitor clicked
  useEffect(() => {
    const applyHash = () => {
      const match = window.location.hash.match(/^#contact-form\?type=(.+)$/);
      if (!match) return;
      const requested = decodeURIComponent(match[1]);
      if ((PROJECT_TYPES as readonly string[]).includes(requested)) {
        setProjectType(requested);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok || !payload.success) {
        setError(payload.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      form.reset();
      setProjectType(PROJECT_TYPES[0]);
      setStatus("sent");
    } catch {
      setError(`Network error. Please email ${CONTACT_EMAIL} directly.`);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="w-full rounded-2xl border border-storm-red/30 bg-storm-gray/40 backdrop-blur-sm p-10 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-storm-red/40 bg-storm-red/10">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-storm-red">
            <path
              d="M4 12.5 9.5 18 20 6.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-black tracking-tight text-storm-light mb-2">
          MESSAGE SENT
        </h3>
        <p className="text-sm text-storm-muted">
          It landed in our inbox. We usually reply within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-xs tracking-[0.2em] uppercase text-storm-red hover:text-storm-red-light transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full rounded-2xl border border-white/5 bg-storm-gray/40 backdrop-blur-sm p-6 sm:p-8 text-left"
      noValidate
    >
      {/* Honeypot — hidden from humans, irresistible to bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL_CLASS} htmlFor="contact-name">
            Your Name *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={80}
            placeholder="Nafis Iqbal"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="contact-email">
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            placeholder="you@example.com"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="contact-company">
            Company / Server
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            maxLength={120}
            placeholder="Optional"
            className={FIELD_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="contact-type">
            What&apos;s This About? *
          </label>
          <select
            id="contact-type"
            name="projectType"
            required
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            className={`${FIELD_CLASS} appearance-none cursor-pointer`}
          >
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-storm-dark">
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="contact-budget">
            Budget
          </label>
          <select
            id="contact-budget"
            name="budget"
            defaultValue=""
            className={`${FIELD_CLASS} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-storm-dark">
              Skip this if you&apos;re joining the team
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range} className="bg-storm-dark">
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL_CLASS} htmlFor="contact-message">
            Message *
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            minLength={10}
            maxLength={4000}
            placeholder="Tell us what you need built — or what you'd bring to the team."
            className={`${FIELD_CLASS} resize-none`}
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-5 rounded-lg border border-storm-red/30 bg-storm-red/10 px-4 py-3 text-sm text-storm-red-light">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-storm-red px-8 py-4 text-base font-bold text-white transition-all duration-300 glow-btn hover:bg-storm-red-dark hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending…
          </>
        ) : (
          "Send It"
        )}
      </button>

      <p className="mt-4 text-center text-xs text-storm-muted/60">
        Straight to our inbox — or mail{" "}
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-storm-red/80 hover:text-storm-red transition-colors"
        >
          {CONTACT_EMAIL}
        </a>{" "}
        yourself.
      </p>
    </form>
  );
}
