import ServicePage from "@/components/service/ServicePage";
import { buildServiceMetadata } from "@/lib/serviceMeta";
import { SERVICE_PAGES } from "@/lib/servicePages";

export const metadata = buildServiceMetadata(SERVICE_PAGES["fivem-developer"]);

export default function FivemDeveloperPage() {
  return <ServicePage slug="fivem-developer" />;
}
