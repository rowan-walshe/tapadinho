import { useTranslation } from "react-i18next";

export function Location() {
  const { t } = useTranslation();

  return (
    <section id="location" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-light text-stone-800 text-center mb-6">
          {t("location.title")}
        </h2>
        <p className="text-lg text-stone-600 text-center max-w-2xl mx-auto mb-12">
          {t("location.description")}
        </p>

        {/* Placeholder Map */}
        <div className="aspect-[16/9] bg-stone-200 rounded-2xl overflow-hidden flex items-center justify-center">
          <div className="text-center p-8">
            <svg
              className="w-16 h-16 mx-auto text-stone-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-stone-500 text-lg">{t("location.mapPlaceholder")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
