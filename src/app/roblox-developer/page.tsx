import ServicePage from "@/components/service/ServicePage";
import { buildServiceMetadata } from "@/lib/serviceMeta";
import { SERVICE_PAGES } from "@/lib/servicePages";

export const metadata = buildServiceMetadata(SERVICE_PAGES["roblox-developer"]);

export default function RobloxDeveloperPage() {
  return <ServicePage slug="roblox-developer" />;
}
