import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Те же 5 тем, что и для копинг-карточек — единая ментальная карта.
const TOPICS = [
  "strah-rodov",
  "prinyatie-tela",
  "otnosheniya",
  "izmeneniya-v-zhizni",
  "neopredelennost",
] as const;

const articles = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      cover: image().optional(),
      draft: z.boolean().default(false),
      // Тема статьи: одна из 5 категорий
      topic: z.enum(TOPICS).optional(),
      // Цитата-выноска для превью в /articles
      quote: z.string().optional(),
    }),
});

export const collections = { articles };

// Лейблы тем для UI — экспорт для использования в страницах
export const TOPIC_LABELS: Record<(typeof TOPICS)[number], string> = {
  "strah-rodov": "Страх родов",
  "prinyatie-tela": "Принятие тела",
  "otnosheniya": "Окружение и отношения",
  "izmeneniya-v-zhizni": "Изменения в жизни",
  "neopredelennost": "В период неопределённости",
};
