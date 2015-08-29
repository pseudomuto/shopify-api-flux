"use strict";

jest.dontMock("../ProductActions");

import Constants from "../../Constants";

function resolveWith(api, response) {
  api.get.mockReturnValue(new Promise((resolve, _) => resolve(response)));
}

describe("ProductActions", () => {
  var actions, dispatcher, api;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");
    actions    = require("../ProductActions");
    api        = require("../../utilities/WebAPI");
  });

  describe("fetch", () => {
    var request;
    let actionType = Constants.Data.MERGE_PRODUCTS;

    describe("when passed a single id", () => {
      let product = { id: 1, title: "Some Product" };

      beforeEach(() => {
        resolveWith(api, { product });
        request = actions.fetch(1);
      });

      it("fetches the product", () => {
        expect(api.get).toBeCalledWith("/admin/products/1.json");
      });

      pit("dispatches MERGE_PRODUCTS", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, products: [product] });
        });
      });
    });

    describe("when passed an object", () => {
      let products = [{ id: 1, title: "Some Product" }];

      beforeEach(() => {
        resolveWith(api, { products });
        request = actions.fetch({ ids: [1, 2, 3] });
      });

      it("fetches the products", () => {
        let encodedQuery = `ids=${encodeURIComponent("1,2,3")}`;
        expect(api.get).toBeCalledWith(`/admin/products.json?${encodedQuery}`);
      });
    });

    describe("when called without parameters", () => {
      let products = [
        { id: 1, title: "First Product" },
        { id: 2, title: "Second Product" }
      ];

      beforeEach(() => {
        resolveWith(api, { products });
        request = actions.fetch();
      });

      it("makes the request", () => {
        expect(api.get).toBeCalledWith("/admin/products.json");
      });

      pit("dispatches the merge action", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, products });
        });
      });
    });
  });
});
