import { normalizeCustomAsset } from "./petAppearances";
import type { CustomAction } from "./types";

const MAX_CUSTOM_ACTIONS = 20;
const ACTION_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export function normalizeCustomActions(value: unknown): CustomAction[] {
  if (!Array.isArray(value)) return [];

  const actions: CustomAction[] = [];
  const usedIds = new Set<string>();

  for (const [index, entry] of value.entries()) {
    if (!entry || typeof entry !== "object") continue;
    const source = entry as Partial<CustomAction>;
    const rawName = typeof source.name === "string" ? source.name.slice(0, 40) : "";
    const name = rawName.trim() ? rawName : "";
    const asset = normalizeCustomAsset(source.asset);
    if (!name && !asset) continue;

    let id =
      typeof source.id === "string" && ACTION_ID_PATTERN.test(source.id)
        ? source.id
        : `action-${Date.now()}-${index}`;
    if (usedIds.has(id)) id = `${id}-${index}`;
    usedIds.add(id);

    actions.push({ id, name, asset });
    if (actions.length >= MAX_CUSTOM_ACTIONS) break;
  }

  return actions;
}
