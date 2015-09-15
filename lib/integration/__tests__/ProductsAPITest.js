"use strict";

jest.autoMockOff();

const ShopifyAPI           = require("../../ShopifyAPI");
const { Product, Session } = ShopifyAPI;

describe("Products API", () => {
  setupIntegrationTest(Session);

  let productId = Number(process.env.SHOPIFY_API_PRODUCT_ID);

  it("sets up the session correctly", () => {
    expect(Session.store.getDomain()).toBe(process.env.SHOPIFY_API_DOMAIN);
    expect(Session.store.getAccessToken()).toBe(process.env.SHOPIFY_API_TOKEN);
  });

  describe("getting products", () => {
    pit("GET /admin/products.json", () => {
      return Product.fetch().then(products => {
        expect(products.length).toBeGreaterThan(0);
      });
    });

    pit("GET /admin/products.json?ids=", () => {
      return Product.fetch({ ids: [productId] }).then(products => {
        expect(products.length).toBe(1);
        expect(products[0].id).toBe(productId);
      });
    });

    pit("GET /admin/products/:id.json", () => {
      return Product.fetch(productId).then(products => {
        expect(products).toBeDefined();
        expect(products.length).toBe(1);
        expect(products[0].id).toBe(productId);
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
      return Product.fetchCount({ id: productId }).then(count => {
        expect(count).toBe(1);
      });
    });
  });
});
