import { NewsHeroClient, type NewsHeroClientProps } from "./NewsHero.client";

// W tym momencie propsy są identyczne, ale w przyszłości NewsHero
// mógłby przyjmować np. obiekt z Sanity i wyciągać z niego te pola.
export const NewsHero = (props: NewsHeroClientProps) => {
  return <NewsHeroClient {...props} />;
};
