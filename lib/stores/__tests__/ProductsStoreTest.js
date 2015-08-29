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
    expect(store.mergeAction()).toBe(Constants.Actions.MERGE_PRODUCTS);
  });

  it("correctly defines clearAction", () => {
    expect(store.clearAction()).toBe(Constants.Actions.CLEAR_PRODUCTS);
  });
});
