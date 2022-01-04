import { DateTime } from "luxon";

const FRIDAY = 5;

export function findNextSalaryDay(from: DateTime, now: DateTime): DateTime {
  const day25 = from.set({ day: 25 });

  if (day25.weekday > FRIDAY) {
    const weekdayOffset = day25.weekday % FRIDAY;
    const fridayBefore25 = day25.minus({ day: weekdayOffset });
    if (fridayBefore25 > now) {
      return fridayBefore25;
    }
    const nextMonth = from.startOf("month").plus({ month: 1 });
    return findNextSalaryDay(nextMonth, now);
  }

  return day25;
}
