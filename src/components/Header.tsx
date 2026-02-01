import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export function Header() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "pt" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const navItems = [
    { key: "home", href: "#" },
    { key: "about", href: "#about" },
    { key: "gallery", href: "#gallery" },
    { key: "reviews", href: "#reviews" },
    { key: "location", href: "#location" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#"
            className={`text-xl font-semibold transition-colors ${
              isScrolled ? "text-stone-800" : "text-white"
            }`}
          >
            Tapadinho
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`transition-colors ${
                  isScrolled
                    ? "text-stone-600 hover:text-stone-900"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {t(`header.${item.key}`)}
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                isScrolled
                  ? "border border-stone-300 hover:bg-stone-100"
                  : "border border-white/50 text-white hover:bg-white/20"
              }`}
            >
              {i18n.language === "en" ? "PT" : "EN"}
            </button>

            {/* Book CTA */}
            <a
              href="#calendar"
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              {t("header.book")}
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? "text-stone-800" : "text-white"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-stone-200">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-stone-600 hover:text-stone-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(`header.${item.key}`)}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4 border-t border-stone-200">
                <button
                  onClick={toggleLanguage}
                  className="px-3 py-1 text-sm border border-stone-300 rounded-full hover:bg-stone-100 transition-colors"
                >
                  {i18n.language === "en" ? "PT" : "EN"}
                </button>
                <a
                  href="#calendar"
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t("header.book")}
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
