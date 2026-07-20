// Fake booking data to simulate iCal feed from Airbnb
// Format: Array of booked date ranges

export interface Booking {
  id: string;
  start: string; // ISO date string (YYYY-MM-DD)
  end: string; // ISO date string (YYYY-MM-DD)
  summary?: string; // Optional booking title
}

// Sample bookings - simulating what we'd parse from an iCal feed
export const bookings: Booking[] = [
  // February 2026
  {
    id: "booking-1",
    start: "2026-02-14",
    end: "2026-02-18",
    summary: "Reserved",
  },
  {
    id: "booking-2",
    start: "2026-02-22",
    end: "2026-02-25",
    summary: "Reserved",
  },

  // March 2026
  {
    id: "booking-3",
    start: "2026-03-07",
    end: "2026-03-14",
    summary: "Reserved",
  },
  {
    id: "booking-4",
    start: "2026-03-21",
    end: "2026-03-28",
    summary: "Reserved",
  },

  // April 2026
  {
    id: "booking-5",
    start: "2026-04-04",
    end: "2026-04-11",
    summary: "Reserved",
  },
  {
    id: "booking-6",
    start: "2026-04-18",
    end: "2026-04-25",
    summary: "Reserved",
  },

  // May 2026
  {
    id: "booking-7",
    start: "2026-05-01",
    end: "2026-05-05",
    summary: "Reserved",
  },
  {
    id: "booking-8",
    start: "2026-05-15",
    end: "2026-05-22",
    summary: "Reserved",
  },
  {
    id: "booking-9",
    start: "2026-05-28",
    end: "2026-06-02",
    summary: "Reserved",
  },

  // June 2026 - High season, more bookings
  {
    id: "booking-10",
    start: "2026-06-06",
    end: "2026-06-13",
    summary: "Reserved",
  },
  {
    id: "booking-11",
    start: "2026-06-15",
    end: "2026-06-22",
    summary: "Reserved",
  },
  {
    id: "booking-12",
    start: "2026-06-27",
    end: "2026-07-04",
    summary: "Reserved",
  },

  // July 2026 - Peak season
  {
    id: "booking-13",
    start: "2026-07-04",
    end: "2026-07-11",
    summary: "Reserved",
  },
  {
    id: "booking-14",
    start: "2026-07-13",
    end: "2026-07-25",
    summary: "Reserved",
  },
  {
    id: "booking-15",
    start: "2026-07-27",
    end: "2026-08-03",
    summary: "Reserved",
  },

  // August 2026 - Peak season
  {
    id: "booking-16",
    start: "2026-08-03",
    end: "2026-08-10",
    summary: "Reserved",
  },
  {
    id: "booking-17",
    start: "2026-08-15",
    end: "2026-08-29",
    summary: "Reserved",
  },
];

// Format a Date as YYYY-MM-DD using local time. Never use toISOString()
// for calendar dates: it converts to UTC, which shifts the day for
// visitors in other timezones.
export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Parse a YYYY-MM-DD string as a local-time Date (new Date("YYYY-MM-DD")
// would parse it as UTC midnight)
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Helper function to check if a date falls within any booking
export function isDateBooked(date: Date, bookingsList: Booking[]): boolean {
  const dateStr = formatLocalDate(date);

  return bookingsList.some((booking) => {
    return dateStr >= booking.start && dateStr < booking.end;
  });
}

// Helper to get all dates in a range
export function getDatesInRange(start: Date, end: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(start);

  while (current < end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

// Get booked date strings for a given month
export function getBookedDatesForMonth(
  year: number,
  month: number,
  bookingsList: Booking[],
): Set<string> {
  const bookedDates = new Set<string>();

  bookingsList.forEach((booking) => {
    const start = parseLocalDate(booking.start);
    const end = parseLocalDate(booking.end);

    // Get all dates in the booking range
    const dates = getDatesInRange(start, end);

    dates.forEach((date) => {
      if (date.getFullYear() === year && date.getMonth() === month) {
        bookedDates.add(formatLocalDate(date));
      }
    });
  });

  return bookedDates;
}
