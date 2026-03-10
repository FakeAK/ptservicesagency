import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/blog',
    generateId: ({ entry }) => {
      // entry is like "en/thailand-tdac.md" or "th/thailand-tdac.md"
      // Use the full path (without extension) as the ID to avoid duplicates
      return entry.replace(/\.md$/, '');
    },
  }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    excerpt: z.string(),
    slug: z.string(),
    image: z.string(),
    heroAlt: z.string(),
    lang: z.enum(['th', 'en']),
    author: z.string().default('PT Services Agency'),
  }),
});

export const collections = { blog };
