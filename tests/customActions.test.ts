import assert from "node:assert/strict";
import { normalizeCustomActions } from "../src/shared/customActions";

export const tests = [
  {
    name: "normalizeCustomActions keeps valid entries",
    run(): void {
      const actions = normalizeCustomActions([
        {
          id: "hello",
          name: " Say hi ",
          asset: {
            relativePath: "custom_action_assets/action-1-hi.gif",
            originalName: "hi.gif",
            updatedAt: 5
          }
        }
      ]);

      assert.equal(actions.length, 1);
      assert.equal(actions[0]?.id, "hello");
      assert.equal(actions[0]?.name, " Say hi ");
      assert.equal(actions[0]?.asset?.relativePath, "custom_action_assets/action-1-hi.gif");
    }
  },
  {
    name: "normalizeCustomActions drops entries without a name",
    run(): void {
      assert.deepEqual(normalizeCustomActions([{ id: "a", name: "   ", asset: null }]), []);
      assert.deepEqual(normalizeCustomActions([null, 5, "x"]), []);
      assert.deepEqual(normalizeCustomActions(undefined), []);
    }
  },
  {
    name: "normalizeCustomActions drops assets outside the custom asset roots",
    run(): void {
      const [action] = normalizeCustomActions([
        {
          id: "a",
          name: "Bad",
          asset: { relativePath: "/etc/passwd.gif", originalName: "x.gif", updatedAt: 1 }
        }
      ]);
      assert.equal(action?.asset, null);
    }
  },
  {
    name: "normalizeCustomActions replaces invalid ids and dedupes",
    run(): void {
      const actions = normalizeCustomActions([
        { id: "bad id!", name: "One", asset: null },
        { id: "same", name: "Two", asset: null },
        { id: "same", name: "Three", asset: null }
      ]);

      assert.equal(actions.length, 3);
      assert.equal(actions[0]?.id.startsWith("action-"), true);
      assert.equal(actions[1]?.id, "same");
      assert.notEqual(actions[2]?.id, actions[1]?.id);
    }
  },
  {
    name: "normalizeCustomActions caps the list length",
    run(): void {
      const many = Array.from({ length: 30 }, (_, index) => ({
        id: `a${index}`,
        name: `Action ${index}`,
        asset: null
      }));
      assert.equal(normalizeCustomActions(many).length, 20);
    }
  }
];
