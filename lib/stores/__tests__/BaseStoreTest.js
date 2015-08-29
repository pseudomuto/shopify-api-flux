"use strict";

jest.dontMock("../../dispatcher/ApiDispatcher");
jest.dontMock("flux/utils");
jest.dontMock("../BaseStore");

const BaseStore = require("../BaseStore");

class ThingsStore extends BaseStore {
}

describe("BaseStore", () => {
  var store, dispatcher, changeEvent;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");

    store = new ThingsStore(dispatcher);
    store.__emitter.emit = jest.genMockFunction();

    changeEvent = store.__emitter.emit;
  });

  it("responds to actions appropriately", () => {
    expect(store.has(1)).toBe(false);
    expect(store.get(1)).toBeUndefined();

    dispatcher.dispatch({
      actionType: store.mergeAction(),
      items: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(store.has(1)).toBe(true);
    expect(store.get(1).title).toBe("My Product");
  });

  it("only emits a single change event even with multiple values", () => {
    dispatcher.dispatch({
      actionType: store.mergeAction(),
      items: [
        { id: 1, title: "My First Product" },
        { id: 2, title: "My Second Product" },
        { id: 3, title: "My Third Product" }
      ]
    });

    expect(store.has(1)).toBe(true);
    expect(store.has(2)).toBe(true);
    expect(store.has(3)).toBe(true);

    expect(changeEvent.mock.calls.length).toBe(1);
  });

  it("doesn't emit a change event when the values haven't changed", () => {
    dispatcher.dispatch({
      actionType: store.mergeAction(),
      items: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(changeEvent.mock.calls.length).toBe(1);

    dispatcher.dispatch({
      actionType: store.mergeAction(),
      items: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(changeEvent.mock.calls.length).toBe(1);
  });

  it("clears the cache", () => {
    dispatcher.dispatch({
      actionType: store.mergeAction(),
      items: [
        { id: 1, title: "My Product" }
      ]
    });

    expect(changeEvent.mock.calls.length).toBe(1);

    dispatcher.dispatch({ actionType: store.clearAction() });

    expect(store.has(1)).toBe(false);
    expect(changeEvent.mock.calls.length).toBe(2);
  });
});
