"use strict";

jest.dontMock("../Base");
jest.dontMock("../Products");

import Constants from "../../Constants";

describe("Products", () => {
  var store;

  beforeEach(() => {
    store = require("../Products");
  });

  it("correctly defines mergeAction", () => {
    expect(store._mergeAction).toBe(Constants.Actions.MERGE_PRODUCTS);
  });

  it("correctly defines clearAction", () => {
    expect(store._clearAction).toBe(Constants.Actions.CLEAR_PRODUCTS);
  });
});
