import { useCallback, useEffect, useRef } from "react";

const HEADER_OFFSET = 64; // h-16 fixed header
const SCROLL_DURATION = 600;

// Smoothly scrolls to a section ("#id", or "#" for the top of the page).
// The animation is cancelled as soon as the user scrolls manually.
export function useScrollToSection() {
  const isAutoScrollingRef = useRef(false);
  const scrollAnimationRef = useRef<number | null>(null);

  const cancelAutoScroll = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  useEffect(() => {
    const handleUserScroll = () => {
      if (isAutoScrollingRef.current) {
        cancelAutoScroll();
      }
    };

    window.addEventListener("wheel", handleUserScroll, { passive: true });
    window.addEventListener("touchmove", handleUserScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserScroll);
      window.removeEventListener("touchmove", handleUserScroll);
      cancelAutoScroll();
    };
  }, [cancelAutoScroll]);

  return useCallback(
    (targetId: string) => {
      const target =
        targetId === "#" ? document.body : document.querySelector(targetId);
      if (!target) return;

      const targetPosition =
        targetId === "#"
          ? 0
          : (target as HTMLElement).offsetTop - HEADER_OFFSET;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      cancelAutoScroll();
      isAutoScrollingRef.current = true;

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animateScroll = (currentTime: number) => {
        if (!isAutoScrollingRef.current) return;

        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / SCROLL_DURATION, 1);
        const easeProgress = easeOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (progress < 1) {
          scrollAnimationRef.current = requestAnimationFrame(animateScroll);
        } else {
          isAutoScrollingRef.current = false;
          scrollAnimationRef.current = null;
        }
      };

      scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    },
    [cancelAutoScroll],
  );
}
