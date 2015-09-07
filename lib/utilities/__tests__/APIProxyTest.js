"use strict";

jest.dontMock("../APIProxy");
jest.dontMock("../../resources/Base");
jest.dontMock("../../resources/Product");

describe("APIProxy", () => {
  var api, actions, store;

  beforeEach(() => {
    const APIProxy = require("../APIProxy");

    actions       = require("../../resources/Product");
    actions.fetch = jest.genMockFunction();

    store = require("../../stores/ProductsStore");
    api   = new APIProxy(actions, store);
  });

  it("decorates the proxy object with action methods", () => {
    let actionMethods = actions.constructor.actionMethods;
    actionMethods.forEach(method => expect(api[method]).toBeDefined(`${method} not defined`));
  });

  it("proxies action method calls to the action object", () => {
    api.fetch();
    expect(actions.fetch).toBeCalled();
  });

  it("exposes a read-only property called store", () => {
    expect(api.store).toBe(store);
    expect(() => api.store = null).toThrow();
  });
});
