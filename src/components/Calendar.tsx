import { useTranslation } from "react-i18next";

// Airbnb listing URL
const AIRBNB_URL = "https://www.airbnb.co.uk/rooms/21234892";

export function Calendar() {
  const { t } = useTranslation();

  return (
    <section id="calendar" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-6">
          {t("calendar.title")}
        </h2>
        <p className="text-lg text-stone-600 mb-8">
          {t("calendar.description")}
        </p>

        {/* Placeholder Calendar */}
        <div className="bg-stone-100 rounded-2xl p-12 mb-8">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
              <div key={i} className="text-stone-500 font-medium text-sm">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm ${
                  i < 3 || i > 30
                    ? "text-stone-300"
                    : i % 7 === 0 || i === 14 || i === 21
                      ? "bg-stone-300 text-stone-500"
                      : "bg-white text-stone-700 hover:bg-amber-100 cursor-pointer"
                }`}
              >
                {((i - 2 + 31) % 31) + 1}
              </div>
            ))}
          </div>
          <p className="text-stone-500 mt-6 text-sm italic">
            {t("calendar.placeholder")}
          </p>
        </div>

        {/* CTA Button */}
        <a
          href={AIRBNB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 bg-[#FF5A5F] hover:bg-[#e54850] text-white rounded-lg text-lg transition-colors"
        >
          <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.001 18.275c-.208 0-.417-.052-.604-.156l-.072-.042c-.752-.442-1.442-.995-2.052-1.643-1.659-1.769-2.609-3.836-2.609-5.675 0-1.874.73-3.559 1.938-4.682 1.07-.996 2.479-1.547 3.97-1.547h.856c1.491 0 2.9.551 3.97 1.547 1.208 1.123 1.938 2.808 1.938 4.682 0 1.839-.95 3.906-2.609 5.675-.61.648-1.3 1.201-2.052 1.643l-.072.042c-.187.104-.396.156-.604.156h.002zm0-12.245h-.428c-1.068 0-2.078.385-2.843 1.097-.852.793-1.322 1.942-1.322 3.232 0 1.469.783 3.189 2.15 4.646.538.574 1.136 1.07 1.777 1.476l.049.029c.112.066.282.12.417.12s.305-.054.417-.12l.049-.029c.641-.406 1.239-.902 1.777-1.476 1.367-1.457 2.15-3.177 2.15-4.646 0-1.29-.47-2.439-1.322-3.232-.765-.712-1.775-1.097-2.843-1.097h-.428zm.428 6.47c-1.208 0-2.192-.984-2.192-2.192s.984-2.192 2.192-2.192 2.192.984 2.192 2.192-.984 2.192-2.192 2.192zm0-3.384c-.658 0-1.192.534-1.192 1.192s.534 1.192 1.192 1.192 1.192-.534 1.192-1.192-.534-1.192-1.192-1.192z" />
          </svg>
          {t("calendar.cta")}
        </a>
      </div>
    </section>
  );
}
