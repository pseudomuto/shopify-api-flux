"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const { Country, Session } = ShopifyAPI;

const CountryId = 100312773;

describe("Countries API", () => {
  setupIntegrationTest(Session);

  describe("getting countries", () => {
    pit("GET /admin/countries.json", () => {
      return Country.fetch().then(countries => {
        expect(countries.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/countries.json?ids=", () => {
      return Country.fetch({ ids: [CountryId] }).then(countries => {
        expect(countries.length).toBe(2); // rest of world is always included
        expect(countries[0].id).toBe(CountryId);
      });
    });

    pit("GET /admin/countries/:id.json", () => {
      return Country.fetch(CountryId).then(countries => {
        expect(countries).toBeDefined();
        expect(countries.length).toBe(1);
        expect(countries[0].id).toBe(CountryId);
      });
    });
  });

  describe("counting countries", () => {
    pit ("GET /admin/countries/count.json", () => {
      return Country.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/countries/count.json?id=", () => {
      return Country.fetchCount({ id: CountryId }).then(count => {
        expect(count).toBe(2); // rest of world is always included
      });
    });
  });
});
