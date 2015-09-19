"use strict";

jest.autoMockOff();

const ShopifyAPI            = require("../../ShopifyAPI");
const { Redirect, Session } = ShopifyAPI;

const RedirectId = 54522693;

describe("Redirects API", () => {
  setupIntegrationTest(Session);

  describe("getting redirects", () => {
    pit("GET /admin/redirects.json", () => {
      return Redirect.fetch().then(redirects => {
        expect(redirects.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/redirects.json?ids=", () => {
      return Redirect.fetch({ ids: [RedirectId] }).then(redirects => {
        expect(redirects.length).toBe(1);
        expect(redirects[0].id).toBe(RedirectId);
      });
    });

    pit("GET /admin/redirects/:id.json", () => {
      return Redirect.fetch(RedirectId).then(redirects => {
        expect(redirects).toBeDefined();
        expect(redirects.length).toBe(1);
        expect(redirects[0].id).toBe(RedirectId);
      });
    });
  });

  describe("counting redirects", () => {
    pit ("GET /admin/redirects/count.json", () => {
      return Redirect.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/redirects/count.json?id=", () => {
      return Redirect.fetchCount({ id: RedirectId }).then(count => {
        expect(count).toBe(1);
      });
    });
  });
});
