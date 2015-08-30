"use strict";

jest.dontMock("../utilities/ActionProxy");
jest.dontMock("../ShopifyAPI");

const RESOURCES = [
  "Product",
  "Session",
  "Shop"
];

describe("ShopifyAPI", () => {
  var api;

  beforeEach(() => {
    api = require("../ShopifyAPI")
  });

  it("defines all resources", () => {
    RESOURCES.forEach((resource) => {
      expect(api[resource]).toBeDefined();
      expect(api[resource]).not.toBeNull();
    });
  });

  it("does not expose the session store", () => {
    let sessionApi = api.Session;
    expect(sessionApi.store).toBeNull();
  });
});
