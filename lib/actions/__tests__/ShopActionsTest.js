"use strict";

jest.dontMock("../../utilities/BaseActions");
jest.dontMock("../ShopActions");

import Constants from "../../Constants";

class SuccessResponse {
  json() {
    return new Promise((resolve) => { resolve({ shop: "My Shop Data" }); });
  }
}

describe("ShopActions", () => {
  var actions, dispatcher, api;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");
    actions    = require("../ShopActions");
    api        = require("../../utilities/WebAPI");
  });

  describe(".actionMethods", () => {
    it("exports fetch and clear as action methods", () => {
      let actual   = new Set(actions.constructor.actionMethods);
      let expected = new Set("fetch", "clear");
      expect(actual).toEqual(expected);
    });
  });

  describe("#fetch", () => {
    beforeEach(() => {
      api.get.mockReturnValue(new Promise((resolve) => resolve(new SuccessResponse())));
    });

    it("makes the web request", () => {
      actions.fetch();
      expect(api.get).toBeCalledWith("/admin/shop.json");
    });

    pit("dispatches the action once the shop is retrieved", () => {
      return Promise.resolve(actions.fetch()).then(() => {
        expect(dispatcher.dispatch.mock.calls.length).toBe(1);

        let payload = dispatcher.dispatch.mock.calls[0][0];
        expect(payload.actionType).toBe(Constants.Actions.SET_SHOP);
        expect(payload.shop).toBe(new SuccessResponse().json().shop);
      });
    });

    it("doesn't forward arguments to super", () => {
      actions.fetch({ name: "Some Shop" });
      expect(api.get).toBeCalledWith("/admin/shop.json");
    });
  });

  describe("#clear", () => {
    beforeEach(() => actions.clear());

    it("dispatches the proper action", () => {
      let actionType = Constants.Actions.CLEAR_SHOP;
      expect(dispatcher.dispatch).toBeCalledWith({ actionType });
    });
  });
});
