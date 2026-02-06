import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { bookings, getBookedDatesForMonth } from "../data/bookings";

// Airbnb listing URL
const AIRBNB_URL = "https://www.airbnb.co.uk/rooms/21234892";

// Day names for calendar header
const DAY_NAMES_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_NAMES_PT = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

// Month names
const MONTH_NAMES_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const MONTH_NAMES_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface CalendarMonthProps {
  year: number;
  month: number;
  bookedDates: Set<string>;
  dayNames: string[];
  monthNames: string[];
  today: Date;
}

function CalendarMonth({
  year,
  month,
  bookedDates,
  dayNames,
  monthNames,
  today,
}: CalendarMonthProps) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDay = firstDay.getDay();

  // Create calendar grid
  const days: (number | null)[] = [];

  // Add empty cells for days before the 1st
  for (let i = 0; i < startingDay; i++) {
    days.push(null);
  }

  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const todayStr = today.toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-4 sm:p-6">
      {/* Month header */}
      <h3 className="text-lg font-semibold text-stone-800 mb-4 text-center">
        {monthNames[month]} {year}
      </h3>

      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium text-stone-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          if (day === null) {
            return <div key={i} className="aspect-square" />;
          }

          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isBooked = bookedDates.has(dateStr);
          const isPast = dateStr < todayStr;
          const isToday = dateStr === todayStr;

          return (
            <div
              key={i}
              className={`
                aspect-square flex items-center justify-center rounded-md text-sm transition-colors
                ${
                  isPast
                    ? "text-stone-300 cursor-default"
                    : isBooked
                      ? "bg-stone-200 text-stone-400 cursor-not-allowed line-through"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 cursor-pointer font-medium"
                }
                ${isToday ? "ring-2 ring-amber-400 ring-offset-1" : ""}
              `}
              title={isPast ? "" : isBooked ? "Booked" : "Available"}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Calendar() {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language === "pt";

  const dayNames = isPortuguese ? DAY_NAMES_PT : DAY_NAMES_EN;
  const monthNames = isPortuguese ? MONTH_NAMES_PT : MONTH_NAMES_EN;

  const today = new Date();
  const [startMonth, setStartMonth] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  // Calculate the months to display (current view + next month)
  const displayMonths = useMemo(() => {
    const months = [];
    let { year, month } = startMonth;

    for (let i = 0; i < 2; i++) {
      months.push({ year, month });
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }
    return months;
  }, [startMonth]);

  // Get booked dates for displayed months
  const bookedDatesByMonth = useMemo(() => {
    return displayMonths.map(({ year, month }) =>
      getBookedDatesForMonth(year, month, bookings),
    );
  }, [displayMonths]);

  const handlePrevMonth = () => {
    setStartMonth((prev) => {
      let { year, month } = prev;
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
      // Don't go before current month
      const now = new Date();
      if (
        year < now.getFullYear() ||
        (year === now.getFullYear() && month < now.getMonth())
      ) {
        return prev;
      }
      return { year, month };
    });
  };

  const handleNextMonth = () => {
    setStartMonth((prev) => {
      let { year, month } = prev;
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
      // Limit to 12 months ahead
      const now = new Date();
      const maxDate = new Date(now.getFullYear() + 1, now.getMonth(), 1);
      if (new Date(year, month, 1) > maxDate) {
        return prev;
      }
      return { year, month };
    });
  };

  // Check if navigation is allowed
  const canGoPrev = useMemo(() => {
    const now = new Date();
    return (
      startMonth.year > now.getFullYear() ||
      (startMonth.year === now.getFullYear() &&
        startMonth.month > now.getMonth())
    );
  }, [startMonth]);

  const canGoNext = useMemo(() => {
    const now = new Date();
    const maxDate = new Date(now.getFullYear() + 1, now.getMonth(), 1);
    let nextYear = startMonth.year;
    let nextMonth = startMonth.month + 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear++;
    }
    return new Date(nextYear, nextMonth, 1) <= maxDate;
  }, [startMonth]);

  return (
    <section id="calendar" className="py-20 bg-stone-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-light text-stone-800 mb-4">
            {t("calendar.title")}
          </h2>
          <p className="text-lg text-stone-600 mb-6">
            {t("calendar.description")}
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-200" />
              <span className="text-stone-600">
                {isPortuguese ? "Disponível" : "Available"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-stone-200" />
              <span className="text-stone-600">
                {isPortuguese ? "Reservado" : "Booked"}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handlePrevMonth}
            disabled={!canGoPrev}
            className={`
              p-2 rounded-full transition-colors
              ${
                canGoPrev
                  ? "hover:bg-stone-200 text-stone-700"
                  : "text-stone-300 cursor-not-allowed"
              }
            `}
            aria-label={isPortuguese ? "Mês anterior" : "Previous month"}
          >
            <svg
              className="w-6 h-6"
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

          <button
            onClick={handleNextMonth}
            disabled={!canGoNext}
            className={`
              p-2 rounded-full transition-colors
              ${
                canGoNext
                  ? "hover:bg-stone-200 text-stone-700"
                  : "text-stone-300 cursor-not-allowed"
              }
            `}
            aria-label={isPortuguese ? "Próximo mês" : "Next month"}
          >
            <svg
              className="w-6 h-6"
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
        </div>

        {/* Calendar Grid - 2 months side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {displayMonths.map(({ year, month }, index) => (
            <CalendarMonth
              key={`${year}-${month}`}
              year={year}
              month={month}
              bookedDates={bookedDatesByMonth[index]}
              dayNames={dayNames}
              monthNames={monthNames}
              today={today}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-[#FF5A5F] hover:bg-[#e54850] text-white rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            <svg
              className="w-6 h-6 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12.001 18.275c-.208 0-.417-.052-.604-.156l-.072-.042c-.752-.442-1.442-.995-2.052-1.643-1.659-1.769-2.609-3.836-2.609-5.675 0-1.874.73-3.559 1.938-4.682 1.07-.996 2.479-1.547 3.97-1.547h.856c1.491 0 2.9.551 3.97 1.547 1.208 1.123 1.938 2.808 1.938 4.682 0 1.839-.95 3.906-2.609 5.675-.61.648-1.3 1.201-2.052 1.643l-.072.042c-.187.104-.396.156-.604.156h.002zm0-12.245h-.428c-1.068 0-2.078.385-2.843 1.097-.852.793-1.322 1.942-1.322 3.232 0 1.469.783 3.189 2.15 4.646.538.574 1.136 1.07 1.777 1.476l.049.029c.112.066.282.12.417.12s.305-.054.417-.12l.049-.029c.641-.406 1.239-.902 1.777-1.476 1.367-1.457 2.15-3.177 2.15-4.646 0-1.29-.47-2.439-1.322-3.232-.765-.712-1.775-1.097-2.843-1.097h-.428zm.428 6.47c-1.208 0-2.192-.984-2.192-2.192s.984-2.192 2.192-2.192 2.192.984 2.192 2.192-.984 2.192-2.192 2.192zm0-3.384c-.658 0-1.192.534-1.192 1.192s.534 1.192 1.192 1.192 1.192-.534 1.192-1.192-.534-1.192-1.192-1.192z" />
            </svg>
            {t("calendar.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
