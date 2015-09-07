"use strict";

jest.dontMock("flux");
jest.dontMock("../APIDispatcher");

describe("APIDispatcher", () => {
  var APIDispatcher;

  beforeEach(() => {
    APIDispatcher = require("../APIDispatcher");
  });

  it("sends actions to subscribers", () => {
    let listener = jest.genMockFunction();
    let payload = {};

    APIDispatcher.register(listener);
    APIDispatcher.dispatch(payload);

    expect(listener.mock.calls.length).toBe(1);
    expect(listener.mock.calls[0][0]).toBe(payload);
  });

  it("does things", () => {
    expect(true).toBe(true);
  });
});
