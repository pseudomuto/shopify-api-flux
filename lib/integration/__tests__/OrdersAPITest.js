"use strict";

jest.autoMockOff();

import _ from "lodash";

const ShopifyAPI         = require("../../ShopifyAPI");
const { Order, Session } = ShopifyAPI;

const OrderId = 1322251717;

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

    pit("GET /admin/orders.json?financial_status=paid", () => {
      return Order.fetch({ financial_status: "paid" }).then(orders => {
        expect(_.pluck(orders, "id").indexOf(OrderId)).toBeGreaterThan(-1);
      });
    });

    pit("GET /admin/orders/:id.json", () => {
      return Order.fetch(OrderId).then(orders => {
        expect(orders.length).toBe(1);
        expect(orders[0].id).toBe(OrderId);
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
