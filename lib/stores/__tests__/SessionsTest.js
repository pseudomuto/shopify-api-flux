"use strict";

jest.dontMock("flux/utils");
jest.dontMock("../Sessions");

describe("Session", () => {
  var SessionStore, APIDispatcher;

  beforeEach(() => {
    APIDispatcher = require("../../dispatcher/APIDispatcher");
    SessionStore  = require("../Sessions");
  });

  it("registers a callback with the dispatcher", () => {
    expect(APIDispatcher.register.mock.calls.length).toBe(1);
  });

  it("starts out without a token", () => {
    var token = SessionStore.getAccessToken();
    expect(token).toBeNull();
  });
});
