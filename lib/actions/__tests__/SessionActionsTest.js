"use strict";

jest.dontMock("../../utilities/BaseActions");
jest.dontMock("../SessionActions");

import Constants from "../../Constants";

describe("SessionActions", () => {
  var dispatcher, actions;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");
    actions    = require("../SessionActions");
  });

  describe(".actionMethods", () => {
    it("exports init and clear as action methods", () => {
      let actual   = new Set(actions.constructor.actionMethods);
      let expected = new Set("init", "clear");
      expect(actual).toEqual(expected);
    });
  });

  describe("#init", () => {
    it("dispatches the action appropriately", () => {
      actions.init("david.myshopify.com", "my_shopify_api_token");
      expect(dispatcher.dispatch.mock.calls.length).toBe(1);

      let payload = dispatcher.dispatch.mock.calls[0][0];
      expect(payload.actionType).toBe(Constants.Actions.SET_SESSION);
      expect(payload.domain).toBe("david.myshopify.com");
      expect(payload.accessToken).toBe("my_shopify_api_token");
    });

    it("ensures myshopify.com domain when only host is supplied", () => {
      actions.init("david", "my_shopify_api_token");

      let payload = dispatcher.dispatch.mock.calls[0][0];
      expect(payload.domain).toBe("david.myshopify.com");
    });

    it("raises an error when the supplied domain is falsy", () => {
      expect(() => actions.init(null, "authToken")).toThrow();
      expect(() => actions.init(undefined, "authToken")).toThrow();
      expect(() => actions.init("", "authToken")).toThrow();
    });

    it("raises an error when the supplied token is falsy", () => {
      expect(() => actions.init("domain")).toThrow();
      expect(() => actions.init("domain", null)).toThrow();
      expect(() => actions.init("domain", undefined)).toThrow();
      expect(() => actions.init("domain", "")).toThrow();
    });
  });

  describe("#clear", () => {
    beforeEach(() => actions.clear());

    it("dispatches the proper action", () => {
      let actionType = Constants.Actions.CLEAR_SESSION;
      expect(dispatcher.dispatch).toBeCalledWith({ actionType });
    });
  });
});
