"use strict";

jest.autoMockOff();

const ShopifyAPI          = require("../../ShopifyAPI");
const { Policy, Session } = ShopifyAPI;

describe("Policies API", () => {
  setupIntegrationTest(Session);

  describe("getting policies", () => {
    pit("GET /admin/policies.json", () => {
      return Policy.fetch().then(policies => {
        // refund, tos and privacy
        expect(policies.length).toBe(3);
      });
    });
  });
});
