import { useTranslation } from "react-i18next";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Property Description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6">
              {t("about.title")}
            </h2>
            <p className="text-lg text-stone-600 leading-relaxed">
              {t("about.description")}
            </p>
          </div>

          {/* Feature Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/images/front-door.webp"
              alt="Property front entrance"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Area Description */}
        <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Feature Image */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg md:order-1">
            <img
              src="/images/nature-1.webp"
              alt="Surrounding countryside"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="md:order-2">
            <h3 className="text-3xl md:text-4xl font-light text-stone-800 mb-6">
              {t("about.areaTitle")}
            </h3>
            <p className="text-lg text-stone-600 leading-relaxed">
              {t("about.areaDescription")}
            </p>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "🏊", label: "Pool" },
              { icon: "🌳", label: "Garden" },
              { icon: "🍳", label: "Full Kitchen" },
              { icon: "📶", label: "Free Wi-Fi" },
              { icon: "🛏️", label: "2 Bedrooms" },
              { icon: "🚗", label: "Free Parking" },
              { icon: "🐕", label: "Pet Friendly" },
              { icon: "🌅", label: "Countryside Views" },
            ].map((amenity) => (
              <div
                key={amenity.label}
                className="flex flex-col items-center text-center p-4"
              >
                <span className="text-4xl mb-2">{amenity.icon}</span>
                <span className="text-stone-600">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
