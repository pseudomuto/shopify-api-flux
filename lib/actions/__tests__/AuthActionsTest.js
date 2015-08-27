"use strict";

jest.dontMock("../AuthActions");

import Constants from "../../Constants";

describe("AuthActions", () => {
  var ApiDispatcher, AuthActions;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    AuthActions   = require("../AuthActions");
  });

  describe("setAuthToken", () => {
    it("dispatches the action appropriately", () => {
      AuthActions.setAuthToken("my_shopify_api_token");
      expect(ApiDispatcher.dispatch.mock.calls.length).toBe(1);

      let payload = ApiDispatcher.dispatch.mock.calls[0][0];
      expect(payload.actionType).toBe(Constants.Auth.SET_AUTH_TOKEN);
      expect(payload.accessToken).toBe("my_shopify_api_token");
    });

    it("raises an error when the supplied value is falsy", () => {
      expect(() => AuthActions.setAuthToken()).toThrow();
      expect(() => AuthActions.setAuthToken(null)).toThrow();
      expect(() => AuthActions.setAuthToken(undefined)).toThrow();
      expect(() => AuthActions.setAuthToken("")).toThrow();
    });
  });
});
