// Plik: src/actions/faqActions.ts
"use server";

import type { FaqItem } from "@/lib/types";
import { getFaqRange, getTotalFaqCount } from "@/sanity/lib/queries/contact";

export interface LoadMoreFaqResponse {
  data: FaqItem[];
  totalCount: number;
}

const LIMIT = 5; // Ile pytań ładować na raz (możesz zmienić)

export async function loadMoreFaqs(
  offset: number,
): Promise<LoadMoreFaqResponse> {
  const start = offset;
  const end = offset + LIMIT;

  const [newFaqs, totalCount] = await Promise.all([
    getFaqRange(start, end),
    getTotalFaqCount(),
  ]);

  return {
    data: newFaqs,
    totalCount,
  };
}
