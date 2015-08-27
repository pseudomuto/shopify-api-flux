"use strict";

jest.dontMock("../../Constants");
jest.dontMock("../TokenStore");

const Constants = require("../../Constants");

describe("TokenStore", () => {
  var TokenStore, ApiDispatcher;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    TokenStore = require("../TokenStore");
  })

  it("registers a callback with the dispatcher", () => {
    expect(ApiDispatcher.register.mock.calls.length).toBe(1);
  });

  it("starts out without a token", () => {
    var token = TokenStore.getAccessToken();
    expect(token).toBeNull();
  });
});
