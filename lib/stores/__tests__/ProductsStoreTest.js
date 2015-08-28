"use strict";

jest.dontMock("../../dispatcher/ApiDispatcher");
jest.dontMock("flux/utils");
jest.dontMock("../ProductsStore");

import Constants from "../../Constants";

describe("ProductsStore", () => {
  var ProductsStore, ApiDispatcher, changeEvent;

  beforeEach(() => {
    ApiDispatcher = require("../../dispatcher/ApiDispatcher");
    ProductsStore = require("../ProductsStore");

    changeEvent = jest.genMockFunction();
    ProductsStore.__emitter.emit = changeEvent;
  });

  it("responds to actions appropriately", () => {
    expect(ProductsStore.has(1)).toBe(false);
    expect(ProductsStore.get(1)).toBeUndefined();

    ApiDispatcher.dispatch({
      actionType: Constants.Product.ADD_PRODUCTS,
      products: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(ProductsStore.has(1)).toBe(true);
    expect(ProductsStore.get(1).title).toBe("My Product");
  });

  it("only emits a single change event even with multiple values", () => {
    ApiDispatcher.dispatch({
      actionType: Constants.Product.ADD_PRODUCTS,
      products: [
        { id: 1, title: "My First Product" },
        { id: 2, title: "My Second Product" },
        { id: 3, title: "My Third Product" }
      ]
    });

    expect(ProductsStore.has(1)).toBe(true);
    expect(ProductsStore.has(2)).toBe(true);
    expect(ProductsStore.has(3)).toBe(true);

    expect(changeEvent.mock.calls.length).toBe(1);
  });

  it("doesn't emit a change event when the values haven't changed", () => {
    ApiDispatcher.dispatch({
      actionType: Constants.Product.ADD_PRODUCTS,
      products: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(changeEvent.mock.calls.length).toBe(1);

    ApiDispatcher.dispatch({
      actionType: Constants.Product.ADD_PRODUCTS,
      products: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(changeEvent.mock.calls.length).toBe(1);
  });

  it("clears the cache", () => {
    ApiDispatcher.dispatch({
      actionType: Constants.Product.ADD_PRODUCTS,
      products: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(changeEvent.mock.calls.length).toBe(1);

    ApiDispatcher.dispatch({ actionType: Constants.Product.CLEAR });

    expect(ProductsStore.has(1)).toBe(false);
    expect(changeEvent.mock.calls.length).toBe(2);
  });
});
