"use strict";

jest.dontMock("../ActionProxy");
jest.dontMock("../BaseActions");
jest.dontMock("../../actions/ProductActions");

describe("ActionProxy", () => {
  var api, actions, store;

  beforeEach(() => {
    const ActionProxy = require("../ActionProxy");

    actions       = require("../../actions/ProductActions");
    actions.fetch = jest.genMockFunction();

    store = require("../../stores/ProductsStore");
    api   = new ActionProxy(actions, store);
  });

  it("exposes action methods to the API", () => {
    ["clear", "fetch", "fetchByCollection", "fetchAllSince"].forEach(method => {
      expect(api[method]).toBeDefined(`${method} not defined`);
    });
  });

  it("delegates action method calls to the action object", () => {
    api.fetch();
    expect(actions.fetch).toBeCalled();
  });

  it("exposes a read-only property called store", () => {
    expect(api.store).toBe(store);
    expect(() => api.store = null).toThrow();
  });
});
