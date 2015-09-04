"use strict";

jest.autoMockOff();

const RESOURCES = [
  "Product",
  "Session",
  "Shop"
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
