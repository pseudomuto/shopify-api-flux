"use strict";

jest.autoMockOff();

import _ from "lodash";

const ShopifyAPI            = require("../../ShopifyAPI");
const { Customer, Session } = ShopifyAPI;

const CustomerId = 1332875589;

describe("Customers API", () => {
  setupIntegrationTest(Session);

  describe("getting customers", () => {
    pit("GET /admin/customers.json", () => {
      return Customer.fetch().then(customers => {
        expect(customers.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/customers.json?fields=id,name", () => {
      return Customer.fetch({ fields: ["id", "name"] }).then(customers => {
        expect(customers.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/customers/:id.json", () => {
      return Customer.fetch(CustomerId).then(customers => {
        expect(customers.length).toBe(1);
        expect(customers[0].id).toBe(CustomerId);
      });
    });
  });

  describe("counting customers", () => {
    pit("GET /admin/customers/count.json", () => {
      return Customer.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });
  });

  describe("searching customers", () => {
    pit("GET /admin/customers/search.json?query=", () => {
      return Customer.search({ query: "David" }).then(results => {
        expect(results.length).toBeGreaterThan(0);
        expect(_.pluck(results, "id")).toContain(CustomerId);
      });
    });
  });
});
