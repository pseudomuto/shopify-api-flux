"use strict";

jest.dontMock("../ShopActions");

import Constants from "../../Constants";

class SuccessResponse {
  json() {
    return { shop: "My Shop Data" }
  }
}

describe("ShopActions", () => {
  var ApiDispatcher, ShopActions, WebAPI;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    ShopActions   = require("../ShopActions");
    WebAPI        = require("../../utilities/WebAPI");
  });

  describe("fetch", () => {
    beforeEach(() => {
      WebAPI.get.mockReturnValue(new Promise((resolve, _) => resolve(new SuccessResponse())));
    });

    it("makes the web request", () => {
      ShopActions.fetch();
      expect(WebAPI.get).toBeCalledWith(Constants.Urls.SHOP);
    });

    pit("dispatches the action once the shop is retrieved", () => {
      return Promise.resolve(ShopActions.fetch()).then(() => {
        expect(ApiDispatcher.dispatch.mock.calls.length).toBe(1);

        let payload = ApiDispatcher.dispatch.mock.calls[0][0];
        expect(payload.actionType).toBe(Constants.Shop.SET_CURRENT);
        expect(payload.shop).toBe(new SuccessResponse().json().shop);
      });
    });
  });
});
