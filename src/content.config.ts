import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * All copy lives here so it can be edited without touching components.
 * `pages` holds one file per page per locale (id: "de/home", "en/home", ...).
 * `steps` holds the four method steps (id: "de/01-einrichtung", ...).
 */
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
    })
    .passthrough(),
});

const steps = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/steps' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    teaser: z.string(),
  }),
});

export const collections = { pages, steps };
