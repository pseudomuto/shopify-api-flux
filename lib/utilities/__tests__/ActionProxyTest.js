"use strict";

jest.dontMock("object-assign");
jest.dontMock("../ActionProxy");

describe("ActionProxy", () => {
  var api, actions, store;

  beforeEach(() => {
    const ActionProxy = require("../ActionProxy");

    actions = require("../../actions/ProductActions");
    store   = require("../../stores/ProductsStore");
    api     = new ActionProxy(actions, store);
  });

  it("delegates fetch calls to the action", () => {
    api.fetch();
    api.fetchAllSince(1);

    expect(actions.fetch).toBeCalled();
    expect(actions.fetchAllSince).toBeCalledWith(1);
  });

  it("exposes a read-only property called store", () => {
    expect(api.store).toBe(store);
    expect(() => api.store = null).toThrow();
  });
});
