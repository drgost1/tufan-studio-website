import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import ScrollProgress from "@/components/ScrollProgress";
import { buildServiceJsonLd } from "@/lib/serviceMeta";
import { SERVICE_PAGES, type ServiceSlug } from "@/lib/servicePages";
import ServicePageContent from "./ServicePageContent";

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const jsonLd = buildServiceJsonLd(SERVICE_PAGES[slug]);

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Film grain noise overlay */}
      <div className="noise-overlay" />

      <Navigation />
      <main className="scroll-container scroll-container--free">
        <ServicePageContent slug={slug} />
      </main>
    </>
  );
}
