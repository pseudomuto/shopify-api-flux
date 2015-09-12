"use strict";

jest.dontMock("../Base");
jest.dontMock("../Product");
jest.dontMock("../../utilities/URLHelpers");

import Constants from "../../Constants";

const Base = require("../Base");

describe("Product", () => {
  let products = [{ id: 1, title: "Some Product" }];

  var resource, dispatcher, api;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/APIDispatcher");
    resource   = require("../Product");
    api        = require("../../utilities/WebAPI");
  });

  describe("#apiMethods", () => {
    it("exposes base methods and additional fetch methods", () => {
      let options  = { countable: true, createable: true };
      let actual   = resource.apiMethods;
      let expected = new Base("products", options).apiMethods.concat(["fetchByCollection", "fetchAllSince"]);

      expect(actual).toEqual(expected);
    });
  });

  describe("#fetchByCollection", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { products });
      request = resource.fetchByCollection(12345);
    });

    it("makes the request", () => {
      expect(api.get).toBeCalledWith("/admin/products.json?collection_id=12345");
    });

    pit("dispatches the merge event", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({
          actionType: Constants.Actions.MERGE_PRODUCTS,
          items: products
        });
      });
    });
  });

  describe("#fetchAllSince", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { products });
      request = resource.fetchAllSince(12345);
    });

    it("makes the request", () => {
      expect(api.get).toBeCalledWith("/admin/products.json?since_id=12345");
    });

    pit("dispatches the merge event", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({
          actionType: Constants.Actions.MERGE_PRODUCTS,
          items: products
        });
      });
    });
  });
});
