import assert from "node:assert/strict";
import {
  buildTokenUsageUrl,
  isTokenBalanceConfigured,
  isValidNewApiBaseUrl,
  normalizeNewApiBaseUrl,
  parseTokenUsagePayload
} from "../src/shared/tokenUsage";

const quotaPolicyPayload = {
  code: true,
  message: "ok",
  data: {
    name: "team-token",
    object: "token_usage",
    quota_policy: {
      mode: "weekly",
      source: "team",
      rule_id: 2,
      quota: 30000000,
      extra_quota: 10000000,
      used: 27044179,
      reserved: 6264,
      remaining: 2949557,
      next_reset_at: 1792944000,
      epoch: 2,
      unlimited_quota: false
    },
    total_available: 2949557,
    total_granted: 132115547,
    total_used: 129165990,
    unlimited_quota: false
  }
};

export const tests = [
  {
    name: "normalizeNewApiBaseUrl trims whitespace and trailing slashes",
    run(): void {
      assert.equal(normalizeNewApiBaseUrl("  https://api.example.com/  "), "https://api.example.com");
    }
  },
  {
    name: "buildTokenUsageUrl appends the New API usage path",
    run(): void {
      assert.equal(
        buildTokenUsageUrl("https://api.example.com"),
        "https://api.example.com/api/usage/token/"
      );
      assert.equal(
        buildTokenUsageUrl("https://api.example.com/"),
        "https://api.example.com/api/usage/token/"
      );
    }
  },
  {
    name: "buildTokenUsageUrl keeps an existing /api suffix",
    run(): void {
      assert.equal(
        buildTokenUsageUrl("https://api.example.com/api"),
        "https://api.example.com/api/usage/token/"
      );
    }
  },
  {
    name: "isValidNewApiBaseUrl accepts http and https only",
    run(): void {
      assert.equal(isValidNewApiBaseUrl("https://api.example.com"), true);
      assert.equal(isValidNewApiBaseUrl("http://10.0.0.2:3000"), true);
      assert.equal(isValidNewApiBaseUrl("api.example.com"), false);
      assert.equal(isValidNewApiBaseUrl("ftp://api.example.com"), false);
      assert.equal(isValidNewApiBaseUrl(""), false);
    }
  },
  {
    name: "isTokenBalanceConfigured requires both base URL and API key",
    run(): void {
      assert.equal(
        isTokenBalanceConfigured({ newApiBaseUrl: "https://api.example.com", newApiKey: "sk-1" }),
        true
      );
      assert.equal(
        isTokenBalanceConfigured({ newApiBaseUrl: "https://api.example.com", newApiKey: "  " }),
        false
      );
      assert.equal(isTokenBalanceConfigured({ newApiBaseUrl: "", newApiKey: "sk-1" }), false);
    }
  },
  {
    name: "parseTokenUsagePayload prefers quota_policy remaining and quota",
    run(): void {
      const usage = parseTokenUsagePayload(quotaPolicyPayload);
      assert.equal(usage.tokenName, "team-token");
      assert.equal(usage.remaining, 2949557);
      assert.equal(usage.total, 30000000);
      assert.equal(usage.resetAt, 1792944000000);
      assert.equal(usage.unlimited, false);
      assert.ok(usage.percentRemaining !== null);
      assert.ok(Math.abs(usage.percentRemaining - 9.831856666666666) < 1e-9);
    }
  },
  {
    name: "parseTokenUsagePayload falls back to total_available and total_granted",
    run(): void {
      const usage = parseTokenUsagePayload({
        code: true,
        message: "ok",
        data: {
          name: "simple",
          total_available: 500,
          total_granted: 1000,
          unlimited_quota: false,
          expires_at: 0
        }
      });
      assert.equal(usage.remaining, 500);
      assert.equal(usage.total, 1000);
      assert.equal(usage.percentRemaining, 50);
      assert.equal(usage.resetAt, null);
    }
  },
  {
    name: "parseTokenUsagePayload flags unlimited quotas",
    run(): void {
      const usage = parseTokenUsagePayload({
        code: true,
        message: "ok",
        data: { name: "unlimited", unlimited_quota: true }
      });
      assert.equal(usage.unlimited, true);
    }
  },
  {
    name: "parseTokenUsagePayload surfaces API error messages",
    run(): void {
      assert.throws(
        () => parseTokenUsagePayload({ code: false, message: "无效的令牌" }),
        /无效的令牌/
      );
    }
  },
  {
    name: "parseTokenUsagePayload rejects payloads without balance fields",
    run(): void {
      assert.throws(() => parseTokenUsagePayload({ code: true, data: { name: "nope" } }));
    }
  }
];
