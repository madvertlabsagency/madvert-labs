import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page/ServicePage";
import { getServicePage } from "@/content/service-pages";
import { getServiceEntity } from "@/lib/entities";
import { pageMetadata } from "@/lib/seo";

const content = getServicePage("social-media-management");

export const metadata: Metadata = pageMetadata({
  title: content.metaTitle,
  description: content.metaDescription,
  path: getServiceEntity("social-media-management").path,
});

export default function SocialMediaManagementPage() {
  return <ServicePage content={content} />;
}
