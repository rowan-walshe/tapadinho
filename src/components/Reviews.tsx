import { useTranslation } from "react-i18next";

export function Reviews() {
  const { t } = useTranslation();

  const reviews = [
    { key: "review1" },
    { key: "review2" },
    { key: "review3" },
  ];

  return (
    <section id="reviews" className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-light text-stone-800 text-center mb-12">
          {t("reviews.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.key}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              {/* Stars */}
              <div className="flex text-amber-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-stone-600 italic mb-6">
                "{t(`reviews.${review.key}.text`)}"
              </p>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-500 font-semibold">
                  {t(`reviews.${review.key}.author`).charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-stone-800">
                    {t(`reviews.${review.key}.author`)}
                  </p>
                  <p className="text-sm text-stone-500">
                    {t(`reviews.${review.key}.date`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
