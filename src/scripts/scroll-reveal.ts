/**
 * Reveals elements carrying the `reveal` class as they enter the viewport.
 * Falls back to showing everything when IntersectionObserver is unavailable
 * or when the visitor asked for reduced motion.
 */
const REVEAL_SELECTOR = '.reveal';

function showAll(elements: Iterable<Element>): void {
  for (const element of elements) {
    element.classList.add('is-visible');
  }
}

function initScrollReveal(): void {
  const elements = document.querySelectorAll(REVEAL_SELECTOR);
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    showAll(elements);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.15 },
  );

  for (const element of elements) {
    observer.observe(element);
  }
}

initScrollReveal();
