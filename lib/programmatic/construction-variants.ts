import { CITIES } from "@/data/cities";

export const constructionVariants = CITIES.map((city) => ({
  slug: city.slug,
  cityName: city.name,
  state: city.state,
  standardCostPerSqft: city.standardCostPerSqft,
}));
