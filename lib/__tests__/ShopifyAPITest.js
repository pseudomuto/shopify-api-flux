"use strict";

jest.dontMock("../utilities/ActionProxy");
jest.dontMock("../utilities/BaseActions");
jest.dontMock("../actions/ProductActions");
jest.dontMock("../actions/SessionActions");
jest.dontMock("../actions/ShopActions");
jest.dontMock("../ShopifyAPI");

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
    });
  });

  describe("Session", () => {
    var session;

    beforeEach(() => {
      session = api.Session;
    });

    it("does not expose the store", () => {
      expect(session.store).toBeNull();
    });
  });
});
