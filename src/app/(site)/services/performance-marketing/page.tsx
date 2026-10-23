import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page/ServicePage";
import { getServicePage } from "@/content/service-pages";
import { getServiceEntity } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";

const content = getServicePage("performance-marketing");

export const metadata: Metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: getServiceEntity("performance-marketing").path,
});

export default function PerformanceMarketingPage() {
  return <ServicePage content={content} />;
}
