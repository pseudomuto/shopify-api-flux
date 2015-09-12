"use strict";

jest.dontMock("../Base");
jest.dontMock("../Shop");

import Constants from "../../Constants";

describe("Shop", () => {
  var resource, dispatcher, api;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/APIDispatcher");
    resource   = require("../Shop");
    api        = require("../../utilities/WebAPI");
  });

  describe("#apiMethods", () => {
    it("exports fetch and clear as action methods", () => {
      expect(resource.apiMethods).toEqual(["clear", "fetch"]);
    });
  });

  describe("#fetch", () => {
    let shop = { id: 1, name: "My Shop" };

    var request;

    beforeEach(() => {
      stubRequest(api, "get", { shop });
      request = resource.fetch();
    });

    it("makes the web request", () => {
      expect(api.get).toBeCalledWith("/admin/shop.json");
    });

    pit("dispatches the action once the shop is retrieved", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch.mock.calls.length).toBe(1);

        let payload = dispatcher.dispatch.mock.calls[0][0];
        expect(payload.actionType).toBe(Constants.Actions.SET_SHOP);
        expect(payload.items).toEqual([shop]);
      });
    });

    it("doesn't forward arguments to super", () => {
      resource.fetch({ name: "Some Shop" });
      expect(api.get).toBeCalledWith("/admin/shop.json");
    });
  });

  describe("#clear", () => {
    beforeEach(() => resource.clear());

    it("dispatches the proper action", () => {
      let actionType = Constants.Actions.CLEAR_SHOP;
      expect(dispatcher.dispatch).toBeCalledWith({ actionType });
    });
  });
});
