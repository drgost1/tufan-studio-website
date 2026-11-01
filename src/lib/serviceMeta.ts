import type { Metadata } from "next";
import { SITE_URL, type ServicePageContent } from "@/lib/servicePages";

export function buildServiceMetadata(page: ServicePageContent): Metadata {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${page.metaTitle} | Tufan Studio`,
      description: page.metaDescription,
      url: pageUrl,
      type: "website",
      siteName: "Tufan Studio",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | Tufan Studio`,
      description: page.metaDescription,
    },
  };
}

// Service + breadcrumb + FAQ data, built from the same content the page shows, so
// the structured data can never claim something a visitor can't read.
export function buildServiceJsonLd(page: ServicePageContent) {
  const pageUrl = `${SITE_URL}/${page.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.heading,
        serviceType: page.serviceType,
        description: page.metaDescription,
        url: pageUrl,
        areaServed: "Worldwide",
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Tufan Studio", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.heading, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
