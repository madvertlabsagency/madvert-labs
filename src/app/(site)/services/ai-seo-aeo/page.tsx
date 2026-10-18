import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page/ServicePage";
import { getServicePage } from "@/content/service-pages";
import { getServiceEntity } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";

const content = getServicePage("ai-seo-aeo");

export const metadata: Metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: getServiceEntity("ai-seo-aeo").path,
});

export default function AiSeoAeoPage() {
  return <ServicePage content={content} />;
}
