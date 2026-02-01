import { useTranslation } from "react-i18next";
import { useRef, useCallback } from "react";

export function Hero() {
  const { t } = useTranslation();
  const isAutoScrollingRef = useRef(false);
  const scrollAnimationRef = useRef<number | null>(null);

  const cancelAutoScroll = useCallback(() => {
    if (scrollAnimationRef.current !== null) {
      cancelAnimationFrame(scrollAnimationRef.current);
      scrollAnimationRef.current = null;
    }
    isAutoScrollingRef.current = false;
  }, []);

  const scrollToSection = useCallback(
    (targetId: string) => {
      const target = document.querySelector(targetId);
      if (!target) return;

      const targetPosition = (target as HTMLElement).offsetTop - 64;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 600;
      let startTime: number | null = null;

      cancelAutoScroll();
      isAutoScrollingRef.current = true;

      const handleUserScroll = () => {
        if (isAutoScrollingRef.current) {
          cancelAutoScroll();
          window.removeEventListener("wheel", handleUserScroll);
          window.removeEventListener("touchmove", handleUserScroll);
        }
      };

      window.addEventListener("wheel", handleUserScroll, { passive: true });
      window.addEventListener("touchmove", handleUserScroll, { passive: true });

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const animateScroll = (currentTime: number) => {
        if (!isAutoScrollingRef.current) return;

        if (startTime === null) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);

        window.scrollTo(0, startPosition + distance * easeProgress);

        if (progress < 1) {
          scrollAnimationRef.current = requestAnimationFrame(animateScroll);
        } else {
          isAutoScrollingRef.current = false;
          scrollAnimationRef.current = null;
          window.removeEventListener("wheel", handleUserScroll);
          window.removeEventListener("touchmove", handleUserScroll);
        }
      };

      scrollAnimationRef.current = requestAnimationFrame(animateScroll);
    },
    [cancelAutoScroll],
  );

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/video/hero-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-4 tracking-wide">
          {t("hero.title")}
        </h1>
        <p className="text-xl md:text-2xl font-light mb-8 max-w-2xl">
          {t("hero.subtitle")}
        </p>
        <a
          href="#calendar"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#calendar");
          }}
          className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-lg transition-colors"
        >
          {t("hero.cta")}
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}
