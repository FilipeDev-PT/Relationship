import { useCallback, useEffect, useState } from "react";

/**
 * Quando o elemento entra na viewport, marca como revelado (uma vez).
 * Respeita `prefers-reduced-motion`: revela imediatamente (sem observer).
 */
export function useRevealOnScroll<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12
): [React.RefCallback<T>, boolean] {
  const [element, setElement] = useState<T | null>(null);
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const setRef = useCallback((node: T | null) => {
    setElement(node);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (revealed || element == null) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRevealed(true);
    }, { rootMargin, threshold });

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, revealed, rootMargin, threshold]);

  return [setRef, revealed];
}
