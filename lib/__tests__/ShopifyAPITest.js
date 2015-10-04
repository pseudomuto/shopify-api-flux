"use strict";

jest.autoMockOff();

const RESOURCES = [
  "Blog",
  "Country",
  "Customer",
  "Location",
  "Order",
  "Page",
  "Policy",
  "Product",
  "Redirect",
  "Session",
  "Shop",
  "Theme"
];

describe("ShopifyAPI", () => {
  var api;

  beforeEach(() => {
    api = require("../ShopifyAPI");
  });

  it("defines all resources", () => {
    RESOURCES.forEach(resource => {
      expect(api[resource]).toBeDefined();
      expect(api[resource]).not.toBeNull();
      expect(api[resource].store).not.toBeNull();
    });
  });
});
