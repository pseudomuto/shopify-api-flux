"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const { Product, Session } = ShopifyAPI;

const ProductId = 2158011973;

describe("Products API", () => {
  setupIntegrationTest(Session);

  describe("getting products", () => {
    pit("GET /admin/products.json", () => {
      return Product.fetch().then(products => {
        expect(products.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/products.json?ids=", () => {
      return Product.fetch({ ids: [ProductId] }).then(products => {
        expect(products.length).toBe(1);
        expect(products[0].id).toBe(ProductId);
      });
    });

    pit("GET /admin/products/:id.json", () => {
      return Product.fetch(ProductId).then(products => {
        expect(products).toBeDefined();
        expect(products.length).toBe(1);
        expect(products[0].id).toBe(ProductId);
      });
    });
  });

  describe("counting products", () => {
    pit ("GET /admin/products/count.json", () => {
      return Product.fetchCount().then(count => {
        expect(count).toBeGreaterThan(0);
      });
    });

    pit ("GET /admin/products/count.json?id=", () => {
      return Product.fetchCount({ id: ProductId }).then(count => {
        expect(count).toBe(1);
      });
    });
  });
});
