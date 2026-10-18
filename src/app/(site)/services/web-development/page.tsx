import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page/ServicePage";
import { getServicePage } from "@/content/service-pages";
import { getServiceEntity } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";

const content = getServicePage("web-development");

export const metadata: Metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: getServiceEntity("web-development").path,
});

export default function WebDevelopmentPage() {
  return <ServicePage content={content} />;
}
