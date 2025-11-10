import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import AktualnosciClientPage from "./AktualnosciClientPage";
import type { NewsArticleType } from "@/lib/types";

// Zapytanie GROQ do pobrania wszystkich artykułów, posortowanych od najnowszych
export const newsQuery = groq`*[_type == "newsArticle"] | order(date desc)`;

export default async function AktualnosciPage() {
  const allNews = await client.fetch<NewsArticleType[]>(newsQuery);

  return <AktualnosciClientPage allNews={allNews} />;
}
