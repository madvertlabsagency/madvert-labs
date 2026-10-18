import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleTemplate } from "@/components/article/ArticleTemplate";
import { articlePath, articles, getArticle } from "@/content/articles";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.filter((a) => !a.path).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return pageMetadata({ title: a.metaTitle, description: a.description, path: articlePath(a), type: "article" });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a || a.path) notFound();
  return <ArticleTemplate article={a} />;
}
