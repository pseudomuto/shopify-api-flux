"use strict";

jest.dontMock("../ResourceActions");
jest.dontMock("../ProductActions");

import Constants from "../../Constants";

describe("ProductActions", () => {
  let products = [{ id: 1, title: "Some Product" }];

  var actions, dispatcher, api;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");
    actions    = require("../ProductActions");
    api        = require("../../utilities/WebAPI");
  });

  describe("fetchByCollection", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { products });
      request = actions.fetchByCollection(12345);
    });

    it("makes the request", () => {
      expect(api.get).toBeCalledWith("/admin/products.json?collection_id=12345");
    });

    pit("dispatches the merge event", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({
          actionType: Constants.Data.MERGE_PRODUCTS,
          products: products
        });
      });
    });
  });

  describe("fetchAllSince", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { products });
      request = actions.fetchAllSince(12345);
    });

    it("makes the request", () => {
      expect(api.get).toBeCalledWith("/admin/products.json?since_id=12345");
    });

    pit("dispatches the merge event", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({
          actionType: Constants.Data.MERGE_PRODUCTS,
          products: products
        });
      });
    });
  });
});
