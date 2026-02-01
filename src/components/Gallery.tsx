import { useTranslation } from "react-i18next";
import { useState } from "react";

type Category = "all" | "bedrooms" | "kitchen" | "living" | "outdoor" | "nature";

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
  { src: "/images/kitchen-1.webp", alt: "Kitchen", category: "kitchen" },
  { src: "/images/kitchen-2.webp", alt: "Kitchen", category: "kitchen" },
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
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const categories: Category[] = ["all", "bedrooms", "kitchen", "living", "outdoor", "nature"];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory);

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
              onClick={() => setLightboxImage(image.src)}
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
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-stone-300"
            onClick={() => setLightboxImage(null)}
            aria-label="Close"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
