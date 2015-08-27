"use strict";

jest.dontMock("flux");
jest.dontMock("../ApiDispatcher");

describe("ApiDispatcher", () => {
  var ApiDispatcher;

  beforeEach(() => {
    ApiDispatcher = require("../ApiDispatcher");
  });

  it("sends actions to subscribers", () => {
    let listener = jest.genMockFunction();
    let payload = {};

    ApiDispatcher.register(listener);
    ApiDispatcher.dispatch(payload);

    expect(listener.mock.calls.length).toBe(1);
    expect(listener.mock.calls[0][0]).toBe(payload);
  });

  it("does things", () => {
    expect(true).toBe(true);
  });
});
