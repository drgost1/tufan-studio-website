import ServicePage from "@/components/service/ServicePage";
import { buildServiceMetadata } from "@/lib/serviceMeta";
import { SERVICE_PAGES } from "@/lib/servicePages";

export const metadata = buildServiceMetadata(SERVICE_PAGES["web-developer"]);

export default function WebDeveloperPage() {
  return <ServicePage slug="web-developer" />;
}
