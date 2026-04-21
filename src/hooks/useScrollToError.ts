import { useEffect, useRef, useState } from 'react';

/**
 * useScrollToError — drives the scroll-to-error arrow pattern.
 * When `active` is true, observes `ref` with IntersectionObserver.
 * Returns arrowDir: 'up' | 'down' | null — direction to scroll to reach the error element.
 * Arrow clears automatically when the element scrolls into view.
 */
export function useScrollToError(active: boolean) {
  const ref = useRef<HTMLElement>(null);
  const [arrowDir, setArrowDir] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    if (!active || !ref.current) {
      setArrowDir(null);
      return;
    }

    const el = ref.current;
    const rect = el.getBoundingClientRect();

    if (rect.bottom < 0) {
      setArrowDir('up');
    } else if (rect.top > window.innerHeight) {
      setArrowDir('down');
    }
    // Element is already visible — no arrow needed; arrowDir stays null

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setArrowDir(null);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  return { ref, arrowDir };
}
