"use strict";

jest.autoMockOff();

const ShopifyAPI         = require("../../ShopifyAPI");
const { Order, Session } = ShopifyAPI;

describe("Orders API", () => {
  setupIntegrationTest(Session);

  describe("getting orders", () => {
    pit("GET /admin/orders.json", () => {
      return Order.fetch().then(orders => {
        expect(orders.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/orders.json?fields=id,name", () => {
      return Order.fetch({ fields: ["id", "name"] }).then(orders => {
        expect(orders.length).toBeGreaterThan(0);
      });
    });
  });

  describe("counting orders", () => {
    pit ("GET /admin/orders/count.json", () => {
      return Order.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/orders/count.json?id=", () => {
      return Order.fetchCount({ financial_status: "paid" }).then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });
  });
});
