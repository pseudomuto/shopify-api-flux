"use strict";

jest.dontMock("../ShopStore");

import Constants from "../../Constants";

describe("ShopStore", () => {
  var ShopStore, ApiDispatcher;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    ShopStore     = require("../ShopStore");
  });

  it("registers a callback with the dispatcher", () => {
    expect(ApiDispatcher.register.mock.calls.length).toBe(1);
  });

  it("initially has a null shop", () => {
    expect(ShopStore.get()).toBeNull();
  });
});
