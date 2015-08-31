"use strict";

jest.dontMock("../../actions/ProductActions");
jest.dontMock("../ActionProxy");

describe("ActionProxy", () => {
  var api, actions, store;

  beforeEach(() => {
    const ActionProxy     = require("../ActionProxy");

    actions = require("../../actions/ProductActions");
    store   = require("../../stores/ProductsStore");
    api     = new ActionProxy(actions, store);
  });

  it("exposes action methods to the API", () => {
    ["fetch", "fetchByCollection", "fetchAllSince"].forEach(method => {
      expect(api[method]).toBeDefined(`${method} not defined`);
    });
  });

  it("delegates fetch calls to the action", () => {
    api.fetch();
    expect(actions.fetch).toBeCalled();
  });

  it("exposes a read-only property called store", () => {
    expect(api.store).toBe(store);
    expect(() => api.store = null).toThrow();
  });
});
