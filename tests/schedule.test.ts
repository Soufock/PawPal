import assert from "node:assert/strict";
import {
  dateKey,
  dueScheduleEvents,
  isValidTime,
  normalizeMealTimes,
  normalizeTime,
  scheduleEvents,
  timeToMinutes
} from "../src/shared/schedule";

const baseSettings = {
  scheduleRemindersEnabled: true,
  workStartTime: "09:30",
  workEndTime: "18:30",
  mealTimes: ["12:00"]
};

export const tests = [
  {
    name: "isValidTime accepts 24-hour HH:MM only",
    run(): void {
      assert.equal(isValidTime("09:30"), true);
      assert.equal(isValidTime("00:00"), true);
      assert.equal(isValidTime("23:59"), true);
      assert.equal(isValidTime("24:00"), false);
      assert.equal(isValidTime("9:30"), false);
      assert.equal(isValidTime("09:60"), false);
      assert.equal(isValidTime(930), false);
    }
  },
  {
    name: "normalizeTime falls back for invalid values",
    run(): void {
      assert.equal(normalizeTime("08:15", "09:00"), "08:15");
      assert.equal(normalizeTime("8:15", "09:00"), "09:00");
      assert.equal(normalizeTime(undefined, "09:00"), "09:00");
    }
  },
  {
    name: "normalizeMealTimes dedupes, sorts, and falls back",
    run(): void {
      assert.deepEqual(normalizeMealTimes(["18:00", "12:00", "18:00"], ["12:00"]), [
        "12:00",
        "18:00"
      ]);
      assert.deepEqual(normalizeMealTimes(["bad"], ["12:00"]), ["12:00"]);
      assert.deepEqual(normalizeMealTimes(undefined, ["12:00"]), ["12:00"]);
    }
  },
  {
    name: "timeToMinutes converts a clock time",
    run(): void {
      assert.equal(timeToMinutes("00:00"), 0);
      assert.equal(timeToMinutes("09:30"), 570);
      assert.equal(timeToMinutes("23:59"), 1439);
      assert.equal(timeToMinutes("bad"), null);
    }
  },
  {
    name: "scheduleEvents includes work start, work end, and every meal",
    run(): void {
      const events = scheduleEvents(baseSettings);
      assert.deepEqual(
        events.map((event) => event.key),
        ["workStart", "workEnd", "meal:12:00"]
      );
    }
  },
  {
    name: "dueScheduleEvents fires within the window on a weekday",
    run(): void {
      // 2026-10-23 is a Friday.
      const now = new Date(2026, 9, 23, 9, 31);
      const due = dueScheduleEvents(now, baseSettings, 1);
      assert.equal(due.length, 1);
      assert.equal(due[0]?.kind, "workStart");
      assert.equal(due[0]?.key, `${dateKey(now)}|workStart`);
    }
  },
  {
    name: "dueScheduleEvents ignores events outside the window",
    run(): void {
      const now = new Date(2026, 9, 23, 10, 0);
      assert.deepEqual(dueScheduleEvents(now, baseSettings, 1), []);
    }
  },
  {
    name: "dueScheduleEvents skips weekends",
    run(): void {
      // 2026-10-24 is a Saturday.
      const now = new Date(2026, 9, 24, 9, 30);
      assert.deepEqual(dueScheduleEvents(now, baseSettings, 1), []);
    }
  },
  {
    name: "dueScheduleEvents does nothing while reminders are disabled",
    run(): void {
      const now = new Date(2026, 9, 23, 12, 0);
      assert.deepEqual(
        dueScheduleEvents(now, { ...baseSettings, scheduleRemindersEnabled: false }, 1),
        []
      );
    }
  }
];
