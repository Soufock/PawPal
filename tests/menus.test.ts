import assert from "node:assert/strict";
import { buildPetContextMenuTemplate } from "../src/main/menus";
import { i18n } from "../src/shared/i18n";
import type { CustomAction } from "../src/shared/types";

const labels = i18n("zh-CN").menu;
const noop = (): void => {};

const actions = {
  toggleDog: noop,
  hideDog: noop,
  startFocus: noop,
  stopFocusFromMenu: noop,
  stopFocusFromContext: noop,
  openSettings: noop,
  playCustomAction: noop,
  quit: noop,
  triggerDemo: noop
};

const gif = {
  relativePath: "custom_action_assets/action-1-hi.gif",
  originalName: "hi.gif",
  updatedAt: 1
};

function menuState(customActions: CustomAction[]) {
  return {
    appName: "PawPal",
    dogVisible: true,
    focusActive: false,
    isPackaged: true,
    customActions
  };
}

export const tests = [
  {
    name: "pet context menu lists playable custom actions",
    run(): void {
      const template = buildPetContextMenuTemplate(
        labels,
        menuState([{ id: "hi", name: "打招呼", asset: gif }]),
        actions
      );
      const item = template.find((entry) => entry.label === labels.customActions);
      assert.ok(item);
      const submenu = item.submenu as Electron.MenuItemConstructorOptions[];
      assert.equal(submenu.length, 1);
      assert.equal(submenu[0]?.label, "打招呼");
    }
  },
  {
    name: "pet context menu hides custom actions without a GIF",
    run(): void {
      const template = buildPetContextMenuTemplate(
        labels,
        menuState([
          { id: "empty", name: "没 GIF", asset: null },
          { id: "hi", name: "打招呼", asset: gif }
        ]),
        actions
      );
      const item = template.find((entry) => entry.label === labels.customActions);
      const submenu = item?.submenu as Electron.MenuItemConstructorOptions[];
      assert.equal(submenu.length, 1);
      assert.equal(submenu[0]?.label, "打招呼");
    }
  },
  {
    name: "pet context menu omits the custom action group when empty",
    run(): void {
      const template = buildPetContextMenuTemplate(labels, menuState([]), actions);
      assert.equal(
        template.some((entry) => entry.label === labels.customActions),
        false
      );
    }
  }
];
