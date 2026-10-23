import { DEFAULT_SETTINGS } from "../shared/constants";
import { normalizeCustomActions } from "../shared/customActions";
import { resolveLanguage } from "../shared/i18n";
import {
  hasRequiredCustomPetAssets,
  normalizeCustomAsset,
  normalizeCustomPetAppearance,
  resolvePetAppearanceId
} from "../shared/petAppearances";
import { normalizeMealTimes, normalizeTime } from "../shared/schedule";
import { isTokenBalanceConfigured, normalizeNewApiBaseUrl } from "../shared/tokenUsage";
import type { Settings } from "../shared/types";

export type SettingsStore = {
  get(key: "settings"): Settings;
};

function normalizeNumber(
  value: unknown,
  fallback: number,
  min: number,
  max = Number.POSITIVE_INFINITY
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function normalizeString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

export function normalizeSettings(stored: Partial<Settings> = {}): Settings {
  const customPetAppearance = normalizeCustomPetAppearance(stored.customPetAppearance);
  const petAppearanceId = resolvePetAppearanceId(stored.petAppearanceId ?? DEFAULT_SETTINGS.petAppearanceId);
  const newApiBaseUrl = normalizeNewApiBaseUrl(
    normalizeString(stored.newApiBaseUrl, DEFAULT_SETTINGS.newApiBaseUrl)
  );
  const newApiKey = normalizeString(stored.newApiKey, DEFAULT_SETTINGS.newApiKey).trim();
  const tokenBalanceConfigured = isTokenBalanceConfigured({ newApiBaseUrl, newApiKey });

  return {
    ...DEFAULT_SETTINGS,
    ...stored,
    language: resolveLanguage(stored.language ?? DEFAULT_SETTINGS.language),
    petAppearanceId:
      petAppearanceId === "custom" && !hasRequiredCustomPetAssets(customPetAppearance)
        ? DEFAULT_SETTINGS.petAppearanceId
        : petAppearanceId,
    customPetAppearance,
    breakRunDurationSeconds: normalizeNumber(
      stored.breakRunDurationSeconds,
      DEFAULT_SETTINGS.breakRunDurationSeconds,
      10
    ),
    newApiBaseUrl,
    newApiKey,
    tokenBalanceReminderEnabled:
      stored.tokenBalanceReminderEnabled === true && tokenBalanceConfigured,
    tokenBalanceReminderIntervalMinutes: normalizeNumber(
      stored.tokenBalanceReminderIntervalMinutes,
      DEFAULT_SETTINGS.tokenBalanceReminderIntervalMinutes,
      1,
      1440
    ),
    customActions: normalizeCustomActions(stored.customActions),
    scheduleRemindersEnabled: stored.scheduleRemindersEnabled === true,
    workStartTime: normalizeTime(stored.workStartTime, DEFAULT_SETTINGS.workStartTime),
    workEndTime: normalizeTime(stored.workEndTime, DEFAULT_SETTINGS.workEndTime),
    mealTimes: normalizeMealTimes(stored.mealTimes, DEFAULT_SETTINGS.mealTimes),
    workStartAsset: normalizeCustomAsset(stored.workStartAsset),
    workEndAsset: normalizeCustomAsset(stored.workEndAsset),
    mealAsset: normalizeCustomAsset(stored.mealAsset)
  };
}

export function getStoredSettings(store: SettingsStore): Settings {
  return normalizeSettings(store.get("settings"));
}
