import { net } from "electron";
import type { Settings } from "../shared/types";
import {
  buildTokenUsageUrl,
  parseTokenUsagePayload
} from "../shared/tokenUsage";
import type { TokenUsageSnapshot } from "../shared/tokenUsage";
import { APP_NAME } from "./config";

export async function fetchTokenUsage(settings: Settings): Promise<TokenUsageSnapshot> {
  const url = buildTokenUsageUrl(settings.newApiBaseUrl);
  if (!url) throw new Error("New API base URL is not configured");

  const response = await net.fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${settings.newApiKey.trim()}`,
      "new-api-user": "-1",
      "User-Agent": `${APP_NAME}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`New API returned ${response.status}`);
  }

  const payload: unknown = await response.json();
  return parseTokenUsagePayload(payload);
}
