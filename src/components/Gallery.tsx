import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

type Category = "all" | "bedrooms" | "living" | "outdoor" | "nature";

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
}

const images: GalleryImage[] = [
  { src: "/images/bedroom_1-1.webp", alt: "Bedroom 1", category: "bedrooms" },
  { src: "/images/bedroom_1-2.webp", alt: "Bedroom 1", category: "bedrooms" },
  { src: "/images/bedroom_2-1.webp", alt: "Bedroom 2", category: "bedrooms" },
  { src: "/images/bathroom-1.webp", alt: "Bathroom", category: "bedrooms" },
  {
    src: "/images/kitchen-1.webp",
    alt: "Kitchen & Living",
    category: "living",
  },
  {
    src: "/images/kitchen-2.webp",
    alt: "Kitchen & Living",
    category: "living",
  },
  { src: "/images/living_room-1.webp", alt: "Living Room", category: "living" },
  { src: "/images/living_room-2.webp", alt: "Living Room", category: "living" },
  { src: "/images/interior-1.webp", alt: "Interior", category: "living" },
  { src: "/images/interior-2.webp", alt: "Interior", category: "living" },
  { src: "/images/pool-1.webp", alt: "Pool", category: "outdoor" },
  { src: "/images/pool-2.webp", alt: "Pool", category: "outdoor" },
  { src: "/images/patio-1.webp", alt: "Patio", category: "outdoor" },
  { src: "/images/patio-2.webp", alt: "Patio", category: "outdoor" },
  { src: "/images/front-door.webp", alt: "Front Door", category: "outdoor" },
  { src: "/images/nature-1.webp", alt: "Nature", category: "nature" },
  { src: "/images/nature-2.webp", alt: "Nature", category: "nature" },
  { src: "/images/nature-3.webp", alt: "Nature", category: "nature" },
  { src: "/images/nature-4.webp", alt: "Nature", category: "nature" },
  { src: "/images/nature-5.webp", alt: "Nature", category: "nature" },
];

export function Gallery() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const categories: Category[] = [
    "all",
    "bedrooms",
    "living",
    "outdoor",
    "nature",
  ];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      if (direction === "prev") {
        setLightboxIndex(
          lightboxIndex === 0 ? filteredImages.length - 1 : lightboxIndex - 1,
        );
      } else {
        setLightboxIndex(
          lightboxIndex === filteredImages.length - 1 ? 0 : lightboxIndex + 1,
        );
      }
    },
    [lightboxIndex, filteredImages.length],
  );

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation and scroll prevention
  useEffect(() => {
    if (lightboxIndex === null) return;

    // Lock body scroll
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          navigateLightbox("prev");
          break;
        case "ArrowRight":
          e.preventDefault();
          navigateLightbox("next");
          break;
        case "ArrowUp":
        case "ArrowDown":
          e.preventDefault();
          break;
        case "Escape":
          closeLightbox();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, navigateLightbox, closeLightbox]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigateLightbox("next");
      } else {
        navigateLightbox("prev");
      }
    }
    setTouchStart(null);
  };

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-light text-stone-800 text-center mb-12">
          {t("gallery.title")}
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {t(`gallery.categories.${category}`)}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setLightboxIndex(index)}
              className="aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-white hover:text-stone-300 z-10"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faXmark} className="w-8 h-8" />
          </button>

          {/* Previous button */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("prev");
            }}
            aria-label="Previous image"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-8 h-8" />
          </button>

          {/* Next button */}
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-stone-300 p-2 z-10"
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox("next");
            }}
            aria-label="Next image"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-8 h-8" />
          </button>

          {/* Image */}
          <img
            src={filteredImages[lightboxIndex].src}
            alt={filteredImages[lightboxIndex].alt}
            className="max-w-full max-h-full object-contain px-16"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {lightboxIndex + 1} / {filteredImages.length}
          </div>
        </div>
      )}
    </section>
  );
}
