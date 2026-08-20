// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/**
 * GitHub Pages configuration.
 *
 * - `SITE_URL`: full public URL of the deployed site.
 *   e.g. "https://my-account.github.io" for a user page,
 *        "https://my-account.github.io/wedding" for a project page.
 * - `BASE_PATH`: must be "/<repository-name>/" for a project page,
 *   and "/" for a user page or a custom domain.
 *
 * Both are provided by the GitHub Actions workflow and fall back to
 * sensible local defaults so `npm run dev` works out of the box.
 */
const SITE_URL = process.env.SITE_URL ?? 'https://example.github.io';
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Cormorant Garamond',
      cssVariable: '--font-display',
      weights: [300, 400, 500, 600],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'Jost',
      cssVariable: '--font-body',
      weights: [300, 400, 500],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
