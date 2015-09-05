"use strict";

jest.dontMock("../BaseStore");
jest.dontMock("../ProductsStore");

import Constants from "../../Constants";

describe("ProductsStore", () => {
  var store;

  beforeEach(() => {
    store = require("../ProductsStore");
  });

  it("correctly defines mergeAction", () => {
    expect(store._mergeAction).toBe(Constants.Actions.MERGE_PRODUCTS);
  });

  it("correctly defines clearAction", () => {
    expect(store._clearAction).toBe(Constants.Actions.CLEAR_PRODUCTS);
  });
});
