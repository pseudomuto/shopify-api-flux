"use strict";

jest.dontMock("../Base");
jest.dontMock("../Orders");

import Constants from "../../Constants";

describe("Orders", () => {
  var store;

  beforeEach(() => {
    store = require("../Orders");
  });

  it("correctly defines mergeAction", () => {
    expect(store._mergeAction).toBe(Constants.Actions.MERGE_ORDERS);
  });

  it("correctly defines clearAction", () => {
    expect(store._clearAction).toBe(Constants.Actions.CLEAR_ORDERS);
  });
});
