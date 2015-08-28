"use strict";

jest.dontMock("../SessionActions");

import Constants from "../../Constants";

describe("SessionActions", () => {
  var ApiDispatcher, SessionActions;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    SessionActions   = require("../SessionActions");
  });

  describe("init", () => {
    it("dispatches the action appropriately", () => {
      SessionActions.init("david.myshopify.com", "my_shopify_api_token");
      expect(ApiDispatcher.dispatch.mock.calls.length).toBe(1);

      let payload = ApiDispatcher.dispatch.mock.calls[0][0];
      expect(payload.actionType).toBe(Constants.Session.SET_DOMAIN_AND_TOKEN);
      expect(payload.domain).toBe("david.myshopify.com");
      expect(payload.accessToken).toBe("my_shopify_api_token");
    });

    it("ensures myshopify.com domain when only host is supplied", () => {
      SessionActions.init("david", "my_shopify_api_token");

      let payload = ApiDispatcher.dispatch.mock.calls[0][0];
      expect(payload.domain).toBe("david.myshopify.com");
    });

    it("raises an error when the supplied domain is falsy", () => {
      expect(() => SessionActions.init(null, "authToken")).toThrow();
      expect(() => SessionActions.init(undefined, "authToken")).toThrow();
      expect(() => SessionActions.init("", "authToken")).toThrow();
    });

    it("raises an error when the supplied token is falsy", () => {
      expect(() => SessionActions.init("domain")).toThrow();
      expect(() => SessionActions.init("domain", null)).toThrow();
      expect(() => SessionActions.init("domain", undefined)).toThrow();
      expect(() => SessionActions.init("domain", "")).toThrow();
    });
  });
});
