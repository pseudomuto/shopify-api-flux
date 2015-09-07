"use strict";

jest.dontMock("../Base");
jest.dontMock("../Session");

import Constants from "../../Constants";

describe("Session", () => {
  var dispatcher, resource;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/APIDispatcher");
    resource   = require("../Session");
  });

  describe(".apiMethods", () => {
    it("exports init and clear as action methods", () => {
      expect(resource.constructor.apiMethods).toEqual(["init", "clear"]);
    });
  });

  describe("#init", () => {
    it("dispatches the action appropriately", () => {
      resource.init("david.myshopify.com", "my_shopify_api_token");
      expect(dispatcher.dispatch.mock.calls.length).toBe(1);

      let payload = dispatcher.dispatch.mock.calls[0][0];
      expect(payload.actionType).toBe(Constants.Actions.SET_SESSION);
      expect(payload.domain).toBe("david.myshopify.com");
      expect(payload.accessToken).toBe("my_shopify_api_token");
    });

    it("ensures myshopify.com domain when only host is supplied", () => {
      resource.init("david", "my_shopify_api_token");

      let payload = dispatcher.dispatch.mock.calls[0][0];
      expect(payload.domain).toBe("david.myshopify.com");
    });

    it("raises an error when the supplied domain is falsy", () => {
      expect(() => resource.init(null, "authToken")).toThrow();
      expect(() => resource.init(undefined, "authToken")).toThrow();
      expect(() => resource.init("", "authToken")).toThrow();
    });

    it("raises an error when the supplied token is falsy", () => {
      expect(() => resource.init("domain")).toThrow();
      expect(() => resource.init("domain", null)).toThrow();
      expect(() => resource.init("domain", undefined)).toThrow();
      expect(() => resource.init("domain", "")).toThrow();
    });
  });

  describe("#clear", () => {
    beforeEach(() => resource.clear());

    it("dispatches the proper action", () => {
      let actionType = Constants.Actions.CLEAR_SESSION;
      expect(dispatcher.dispatch).toBeCalledWith({ actionType });
    });
  });
});
