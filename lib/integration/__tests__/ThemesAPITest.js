"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const { Theme, Session } = ShopifyAPI;

const ThemeId = 44291845;

describe("Themes API", () => {
  setupIntegrationTest(Session);

  describe("getting themes", () => {
    pit("GET /admin/themes.json", () => {
      return Theme.fetch().then(themes => {
        expect(themes.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/themes.json?fields=", () => {
      return Theme.fetch({ fields: ["id"] }).then(themes => {
        expect(themes.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/themes/:id.json", () => {
      return Theme.fetch(ThemeId).then(themes => {
        expect(themes).toBeDefined();
        expect(themes.length).toBe(1);
        expect(themes[0].id).toBe(ThemeId);
      });
    });
  });
});
