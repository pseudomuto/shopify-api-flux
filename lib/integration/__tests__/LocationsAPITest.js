"use strict";

jest.autoMockOff();

import _ from "lodash";

const ShopifyAPI            = require("../../ShopifyAPI");
const { Location, Session } = ShopifyAPI;

const LocationId = 3274309;

describe("Locations API", () => {
  setupIntegrationTest(Session);

  describe("getting locations", () => {
    pit("GET /admin/locations.json", () => {
      return Location.fetch().then(locations => {
        expect(_.pluck(locations, "id")).toContain(LocationId);
      });
    });

    pit("GET /admin/locations/:id.json", () => {
      return Location.fetch(LocationId).then(locations => {
        expect(locations.length).toBe(1);
        expect(locations[0].id).toBe(LocationId);
      });
    });
  });
});
