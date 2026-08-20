/**
 * Prefixes a path from `public/` with the configured base path so that
 * assets keep working when the site is served from a GitHub project page
 * such as `https://user.github.io/wedding/`.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
