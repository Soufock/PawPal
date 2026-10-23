import { i18n, pick } from "./i18n";
import type { Language, Settings } from "./types";

type UnknownRecord = Record<string, unknown>;

export type TokenUsageSnapshot = {
  tokenName: string | null;
  remaining: number;
  total: number;
  percentRemaining: number | null;
  resetAt: number | null;
  unlimited: boolean;
};

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function finiteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

export function normalizeNewApiBaseUrl(baseUrl: string): string {
  return baseUrl.trim().replace(/\/+$/, "");
}

export function isValidNewApiBaseUrl(baseUrl: string): boolean {
  try {
    const parsed = new URL(normalizeNewApiBaseUrl(baseUrl));
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function buildTokenUsageUrl(baseUrl: string): string {
  const base = normalizeNewApiBaseUrl(baseUrl);
  if (!base) return "";
  const apiBase = /\/api$/i.test(base) ? base : `${base}/api`;
  return `${apiBase}/usage/token/`;
}

export function isTokenBalanceConfigured(
  settings: Pick<Settings, "newApiBaseUrl" | "newApiKey">
): boolean {
  return (
    normalizeNewApiBaseUrl(settings.newApiBaseUrl).length > 0 &&
    settings.newApiKey.trim().length > 0
  );
}

export function parseTokenUsagePayload(payload: unknown): TokenUsageSnapshot {
  if (!isRecord(payload)) {
    throw new Error("Unexpected token usage response");
  }

  const message = typeof payload.message === "string" ? payload.message : "";
  if (payload.success === false || payload.code === false) {
    throw new Error(message || "Token usage request failed");
  }

  const data = isRecord(payload.data) ? payload.data : payload;
  const policy = isRecord(data.quota_policy) ? data.quota_policy : null;

  const unlimited = data.unlimited_quota === true || policy?.unlimited_quota === true;
  const policyRemaining = policy ? finiteNumber(policy.remaining) : null;
  const policyTotal = policy ? finiteNumber(policy.quota) : null;
  const totalAvailable = finiteNumber(data.total_available);
  const totalGranted = finiteNumber(data.total_granted);

  if (!unlimited && policyRemaining === null && totalAvailable === null) {
    throw new Error("Token usage response has no balance fields");
  }

  const remaining = Math.max(0, policyRemaining ?? totalAvailable ?? 0);
  const total = Math.max(0, policyTotal ?? totalGranted ?? 0);
  const percentRemaining =
    total > 0 ? Math.min(100, Math.max(0, (remaining / total) * 100)) : null;
  const resetSeconds = policy
    ? finiteNumber(policy.next_reset_at)
    : finiteNumber(data.expires_at);
  const resetAt = resetSeconds !== null && resetSeconds > 0 ? resetSeconds * 1000 : null;
  const tokenName =
    typeof data.name === "string" && data.name.trim() ? data.name.trim() : null;

  return {
    tokenName,
    remaining,
    total,
    percentRemaining,
    resetAt,
    unlimited
  };
}

function localeFor(language: Language): string {
  return language === "zh-CN" ? "zh-CN" : "en-US";
}

export function formatTokenAmount(value: number, language: Language): string {
  return new Intl.NumberFormat(localeFor(language), { maximumFractionDigits: 0 }).format(value);
}

export function formatTokenPercent(value: number): string {
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

export function formatTokenResetAt(resetAt: number, language: Language): string {
  return new Intl.DateTimeFormat(localeFor(language), {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(resetAt);
}

export function formatTokenBalanceMessage(
  usage: TokenUsageSnapshot,
  language: Language
): string {
  const labels = i18n(language).bubble;
  if (usage.unlimited) return pick(labels.tokenBalanceUnlimited);

  const remaining = formatTokenAmount(usage.remaining, language);
  if (usage.percentRemaining === null) {
    return pick(labels.tokenBalanceNoTotal)(remaining);
  }

  const percent = formatTokenPercent(usage.percentRemaining);
  const reset = usage.resetAt ? formatTokenResetAt(usage.resetAt, language) : "";
  return pick(labels.tokenBalance)(percent, remaining, reset);
}
