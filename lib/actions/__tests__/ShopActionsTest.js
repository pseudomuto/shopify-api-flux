"use strict";

jest.dontMock("../ShopActions");

import Constants from "../../Constants";

class SuccessResponse {
  json() {
    return new Promise((resolve, _) => {
      resolve({ shop: "My Shop Data" });
    });
  }
}

describe("ShopActions", () => {
  var actions, dispatcher, api;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");
    actions    = require("../ShopActions");
    api        = require("../../utilities/WebAPI");
  });

  describe("fetch", () => {
    beforeEach(() => {
      api.get.mockReturnValue(new Promise((resolve, _) => resolve(new SuccessResponse())));
    });

    it("makes the web request", () => {
      actions.fetch();
      expect(api.get).toBeCalledWith("/admin/shop.json");
    });

    pit("dispatches the action once the shop is retrieved", () => {
      return Promise.resolve(actions.fetch()).then(() => {
        expect(dispatcher.dispatch.mock.calls.length).toBe(1);

        let payload = dispatcher.dispatch.mock.calls[0][0];
        expect(payload.actionType).toBe(Constants.Data.SET_SHOP);
        expect(payload.shop).toBe(new SuccessResponse().json().shop);
      });
    });
  });
});
