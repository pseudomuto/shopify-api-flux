"use strict";

jest.dontMock("../BaseStore");
jest.dontMock("../OrdersStore");

import Constants from "../../Constants";

describe("OrdersStore", () => {
  var store;

  beforeEach(() => {
    store = require("../OrdersStore");
  });

  it("correctly defines mergeAction", () => {
    expect(store._mergeAction).toBe(Constants.Actions.MERGE_ORDERS);
  });

  it("correctly defines clearAction", () => {
    expect(store._clearAction).toBe(Constants.Actions.CLEAR_ORDERS);
  });
});
