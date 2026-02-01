import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import reviewsData from "../data/reviews.json";

interface Review {
  name: string;
  score: number;
  reviewDate: string;
  reviewText: Record<string, string>;
  originalLanguage: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  en: "EN-GB",
  pt: "PT-PT",
};

const LANGUAGE_NAMES: Record<string, string> = {
  "EN-GB": "English",
  "PT-PT": "Portuguese",
  FR: "French",
  ES: "Spanish",
  DE: "German",
  NL: "Dutch",
};

const CARD_WIDTH = 320; // w-80 = 20rem = 320px
const GAP = 32; // gap-8 = 2rem = 32px

const MAX_REVIEW_LENGTH = 200;

export function Reviews() {
  const { t, i18n } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showOriginal, setShowOriginal] = useState<Record<number, boolean>>({});
  const [expandedReviews, setExpandedReviews] = useState<
    Record<number, boolean>
  >({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const isScrollingRef = useRef(false);

  const reviews = reviewsData as Review[];
  const totalReviews = reviews.length;

  const toggleExpanded = (index: number) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Calculate the offset needed to center a card
  const getCenterOffset = () => {
    const container = scrollContainerRef.current;
    if (!container) return 0;
    return (container.clientWidth - CARD_WIDTH) / 2;
  };

  // Initialize scroll position to the middle set, centered
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const centerOffset = getCenterOffset();
    const initialPosition = totalReviews * (CARD_WIDTH + GAP) - centerOffset;
    container.scrollLeft = initialPosition;
  }, [totalReviews]);

  const smoothScrollTo = (
    container: HTMLDivElement,
    targetPosition: number,
    duration: number,
  ): Promise<void> => {
    return new Promise((resolve) => {
      const startPosition = container.scrollLeft;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeOutCubic(progress);

        container.scrollLeft = startPosition + distance * easeProgress;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animateScroll);
    });
  };

  const scrollTo = async (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container || isScrollingRef.current) return;

    isScrollingRef.current = true;

    const centerOffset = getCenterOffset();
    const middleSetOffset = totalReviews * (CARD_WIDTH + GAP);
    let newIndex: number;

    if (direction === "right") {
      newIndex = (currentIndex + 1) % totalReviews;
    } else {
      newIndex = (currentIndex - 1 + totalReviews) % totalReviews;
    }

    // Calculate current and target positions (centered)
    const currentPosition =
      middleSetOffset + currentIndex * (CARD_WIDTH + GAP) - centerOffset;
    const targetPosition =
      currentPosition + (direction === "right" ? 1 : -1) * (CARD_WIDTH + GAP);

    setCurrentIndex(newIndex);

    // Perform smooth scroll animation
    await smoothScrollTo(container, targetPosition, 300);

    // Instantly reset to middle set (no animation), centered
    const resetPosition =
      middleSetOffset + newIndex * (CARD_WIDTH + GAP) - centerOffset;
    container.scrollLeft = resetPosition;

    isScrollingRef.current = false;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language, {
      year: "numeric",
      month: "long",
    });
  };

  const getReviewText = (review: Review, index: number) => {
    const currentLang = LANGUAGE_MAP[i18n.language] || "EN-GB";
    const isShowingOriginal = showOriginal[index];

    if (isShowingOriginal) {
      return (
        review.reviewText[review.originalLanguage] || review.reviewText["EN-GB"]
      );
    }

    return review.reviewText[currentLang] || review.reviewText["EN-GB"];
  };

  const isTranslated = (review: Review) => {
    const currentLang = LANGUAGE_MAP[i18n.language] || "EN-GB";
    return review.originalLanguage !== currentLang;
  };

  const toggleTranslation = (index: number) => {
    setShowOriginal((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex text-amber-500 mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5"
            fill={i < score / 2 ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderReviewCard = (review: Review, index: number, key: string) => {
    const currentLang = LANGUAGE_MAP[i18n.language] || "EN-GB";
    const translated = isTranslated(review);
    const isShowingOriginal = showOriginal[index];
    const isExpanded = expandedReviews[index];
    const fullText = getReviewText(review, index);
    const needsTruncation = fullText.length > MAX_REVIEW_LENGTH;
    const displayText =
      needsTruncation && !isExpanded
        ? fullText.slice(0, MAX_REVIEW_LENGTH).trim() + "..."
        : fullText;

    return (
      <div
        key={key}
        className="bg-white p-8 rounded-2xl shadow-sm shrink-0 w-80"
      >
        {renderStars(review.score)}

        <p className="text-stone-600 mb-2">{displayText}</p>

        {needsTruncation && (
          <button
            onClick={() => toggleExpanded(index)}
            className="text-xs text-amber-600 hover:text-amber-700 mb-4 transition-colors font-medium"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}

        {translated && (
          <button
            onClick={() => toggleTranslation(index)}
            className="block text-xs text-stone-400 hover:text-stone-600 mb-4 transition-colors"
          >
            {isShowingOriginal
              ? `Translate to ${LANGUAGE_NAMES[currentLang] || "English"}`
              : `Translated from ${LANGUAGE_NAMES[review.originalLanguage]} • Show original`}
          </button>
        )}

        <div className="flex items-center mt-4">
          <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 font-semibold">
            {review.name.charAt(0)}
          </div>
          <div className="ml-3">
            <p className="font-medium text-stone-800">{review.name}</p>
            <p className="text-sm text-stone-500">
              {formatDate(review.reviewDate)}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="reviews" className="py-20 bg-amber-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-light text-stone-800 text-center mb-12">
          {t("reviews.title")}
        </h2>

        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scrollTo("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-md hover:bg-stone-50 transition-colors"
            aria-label="Previous review"
          >
            <svg
              className="w-6 h-6 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollTo("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-md hover:bg-stone-50 transition-colors"
            aria-label="Next review"
          >
            <svg
              className="w-6 h-6 text-stone-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            ref={scrollContainerRef}
            className="flex gap-8 overflow-x-hidden items-start py-4"
          >
            {/* Triple the reviews for seamless infinite scroll */}
            {[...Array(3)].map((_, setIndex) =>
              reviews.map((review, reviewIndex) =>
                renderReviewCard(
                  review,
                  reviewIndex,
                  `review-${setIndex}-${reviewIndex}`,
                ),
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
