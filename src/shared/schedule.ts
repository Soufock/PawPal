import type { Settings } from "./types";

const TIME_PATTERN = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function isValidTime(value: unknown): value is string {
  return typeof value === "string" && TIME_PATTERN.test(value);
}

export function normalizeTime(value: unknown, fallback: string): string {
  return isValidTime(value) ? value : fallback;
}

export function normalizeMealTimes(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return [...fallback];
  const unique = new Set<string>();
  for (const entry of value) {
    if (isValidTime(entry)) unique.add(entry);
  }
  return unique.size > 0 ? [...unique].sort() : [...fallback];
}

export function timeToMinutes(time: string): number | null {
  if (!isValidTime(time)) return null;
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

export type ScheduleEventKind = "workStart" | "workEnd" | "meal";

export type ScheduleEvent = {
  key: string;
  kind: ScheduleEventKind;
  time: string;
};

export type ScheduleSettings = Pick<
  Settings,
  "scheduleRemindersEnabled" | "workStartTime" | "workEndTime" | "mealTimes"
>;

export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function scheduleEvents(settings: ScheduleSettings): ScheduleEvent[] {
  return [
    { key: "workStart", kind: "workStart", time: settings.workStartTime },
    { key: "workEnd", kind: "workEnd", time: settings.workEndTime },
    ...settings.mealTimes.map((time) => ({
      key: `meal:${time}`,
      kind: "meal" as const,
      time
    }))
  ];
}

/**
 * Returns the schedule events that are due within `windowMinutes` of `now`.
 * Weekends are skipped, and each event is keyed by day so callers can fire it once.
 */
export function dueScheduleEvents(
  now: Date,
  settings: ScheduleSettings,
  windowMinutes = 5
): ScheduleEvent[] {
  if (!settings.scheduleRemindersEnabled || !isWeekday(now)) return [];

  const dayKey = dateKey(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  return scheduleEvents(settings)
    .filter((event) => {
      const minutes = timeToMinutes(event.time);
      if (minutes === null) return false;
      return nowMinutes >= minutes && nowMinutes - minutes <= windowMinutes;
    })
    .map((event) => ({ ...event, key: `${dayKey}|${event.key}` }));
}
