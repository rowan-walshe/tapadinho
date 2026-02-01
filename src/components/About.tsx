import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSwimmingPool,
  faBed,
  faUtensils,
  faWifi,
  faCar,
  faDog,
  faMountainSun,
  faFire,
  faShower,
  faTv,
  faKitchenSet,
  faBaby,
  faTree,
  faUmbrella,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Amenity {
  icon: IconDefinition;
  labelKey: string;
}

interface AmenitySection {
  titleKey: string;
  items: Amenity[];
}

const amenitySections: AmenitySection[] = [
  {
    titleKey: "outdoor",
    items: [
      { icon: faSwimmingPool, labelKey: "pool" },
      { icon: faTree, labelKey: "garden" },
      { icon: faMountainSun, labelKey: "views" },
      { icon: faUmbrella, labelKey: "patio" },
    ],
  },
  {
    titleKey: "indoor",
    items: [
      { icon: faBed, labelKey: "bedrooms" },
      { icon: faKitchenSet, labelKey: "kitchen" },
      { icon: faFire, labelKey: "fireplace" },
      { icon: faTv, labelKey: "tv" },
    ],
  },
  {
    titleKey: "essentials",
    items: [
      { icon: faWifi, labelKey: "wifi" },
      { icon: faShower, labelKey: "bathroom" },
      { icon: faUtensils, labelKey: "bbq" },
      { icon: faBaby, labelKey: "crib" },
    ],
  },
  {
    titleKey: "convenience",
    items: [
      { icon: faCar, labelKey: "parking" },
      { icon: faDog, labelKey: "pets" },
    ],
  },
];

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
          <h3 className="text-2xl md:text-3xl font-light text-stone-800 text-center mb-12">
            {t("about.amenitiesTitle")}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {amenitySections.map((section) => (
              <div key={section.titleKey} className="space-y-4">
                <h4 className="font-medium text-stone-800 border-b border-stone-200 pb-2">
                  {t(`amenities.sections.${section.titleKey}`)}
                </h4>
                <ul className="space-y-3">
                  {section.items.map((amenity) => (
                    <li
                      key={amenity.labelKey}
                      className="flex items-center gap-3 text-stone-600"
                    >
                      <FontAwesomeIcon
                        icon={amenity.icon}
                        className="w-5 h-5 text-amber-600"
                      />
                      <span>{t(`amenities.${amenity.labelKey}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
