"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const { Webhook, Session } = ShopifyAPI;

const WebhookId = 61280773;

describe("Webhooks API", () => {
  setupIntegrationTest(Session);

  describe("getting webhooks", () => {
    pit("GET /admin/webhooks.json", () => {
      return Webhook.fetch().then(webhooks => {
        expect(webhooks.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/webhooks.json?topic=", () => {
      return Webhook.fetch({ topic: "orders/create" }).then(webhooks => {
        expect(webhooks.length).toBe(1);
        expect(webhooks[0].id).toBe(WebhookId);
      });
    });

    pit("GET /admin/webhooks/:id.json", () => {
      return Webhook.fetch(WebhookId).then(webhooks => {
        expect(webhooks).toBeDefined();
        expect(webhooks.length).toBe(1);
        expect(webhooks[0].id).toBe(WebhookId);
      });
    });
  });

  describe("counting webhooks", () => {
    pit ("GET /admin/webhooks/count.json", () => {
      return Webhook.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/webhooks/count.json?topic=", () => {
      return Webhook.fetchCount({ topic: "orders/create" }).then(count => {
        expect(count).toBe(1);
      });
    });
  });
});
