"use strict";

jest.dontMock("flux/utils");
jest.dontMock("../SessionStore");

import Constants from "../../Constants";

describe("SessionStore", () => {
  var SessionStore, ApiDispatcher;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    SessionStore  = require("../SessionStore");
  })

  it("registers a callback with the dispatcher", () => {
    expect(ApiDispatcher.register.mock.calls.length).toBe(1);
  });

  it("starts out without a token", () => {
    var token = SessionStore.getAccessToken();
    expect(token).toBeNull();
  });
});
