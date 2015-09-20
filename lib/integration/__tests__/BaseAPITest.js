"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const ShopifyAPIError      = require("../../ShopifyAPIError");
const { Product, Session } = ShopifyAPI;

let ensureRejected = () => {
  throw new Error("Should have rejected");
};

describe("Base API", () => {
  setupIntegrationTest(Session);

  describe("error handling", () => {
    pit("throws ShopifyAPIError objects when response is not (200, 299)", () => {
      return Promise.resolve(Product.fetch(1)).then(ensureRejected).catch(error => {
        expect(error instanceof ShopifyAPIError).toBe(true);
      });
    });

    pit("includes the status of the response on the exception", () => {
      return Promise.resolve(Product.fetch(1)).then(ensureRejected).catch(error => {
        expect(error.status).toBe(404);
      });
    });
  });
});
