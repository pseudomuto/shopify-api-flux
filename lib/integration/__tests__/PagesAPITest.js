"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const { Page, Session } = ShopifyAPI;

const PageId = 67616453;

describe("Pages API", () => {
  setupIntegrationTest(Session);

  describe("getting pages", () => {
    pit("GET /admin/pages.json", () => {
      return Page.fetch().then(pages => {
        expect(pages.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/pages.json?title=", () => {
      return Page.fetch({ title: "Frontpage" }).then(pages => {
        expect(pages.length).toBe(1);
        expect(pages[0].id).toBe(PageId);
      });
    });

    pit("GET /admin/pages/:id.json", () => {
      return Page.fetch(PageId).then(pages => {
        expect(pages).toBeDefined();
        expect(pages.length).toBe(1);
        expect(pages[0].id).toBe(PageId);
      });
    });
  });

  describe("counting pages", () => {
    pit ("GET /admin/pages/count.json", () => {
      return Page.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/pages/count.json?title=", () => {
      return Page.fetchCount({ title: "Frontpage" }).then(count => {
        expect(count).toBe(1);
      });
    });
  });
});
