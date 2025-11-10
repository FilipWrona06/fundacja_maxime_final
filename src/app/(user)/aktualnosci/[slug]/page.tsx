import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import NewsDetailClient from "./NewsDetailClient";
import type { NewsArticleType } from "@/lib/types";
import { newsQuery } from "../page";

const articleBySlugQuery = groq`*[_type == "newsArticle" && slug.current == $slug][0]`;
const articleSlugsQuery = groq`*[_type == "newsArticle" && defined(slug.current)][].slug.current`;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage(props: Props) {
  const params = await props.params;
  const { slug } = params;
  const article = await client.fetch<NewsArticleType>(articleBySlugQuery, {
    slug,
  });

  if (!article) {
    notFound();
  }

  const allNews = await client.fetch<NewsArticleType[]>(newsQuery);
  const otherNews = allNews
    .filter((item) => item._id !== article._id)
    .slice(0, 3);

  return <NewsDetailClient article={article} otherNews={otherNews} />;
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(articleSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}
