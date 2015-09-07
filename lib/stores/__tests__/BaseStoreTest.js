"use strict";

jest.dontMock("../../dispatcher/APIDispatcher");
jest.dontMock("flux/utils");
jest.dontMock("../BaseStore");

import Constants from "../../Constants";

const BaseStore = require("../BaseStore");

class ThingsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher, Constants.Actions.MERGE_THINGS, Constants.Actions.CLEAR_THINGS);
  }
}

describe("BaseStore", () => {
  var store, dispatcher;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/APIDispatcher");
    store = new ThingsStore(dispatcher);
  });

  describe("where", () => {
    beforeEach(() => {
      dispatcher.dispatch({
        actionType: Constants.Actions.MERGE_THINGS,
        items: [
          { id: 1, title: "My First Product", collection: { title: "col" } },
          { id: 2, title: "My Second Product", collection: null, tags: ["cool"] },
          { id: 3, title: "My Third Product", tags: ["cool", "thing"] },
          { id: 4, children: [{ title: "First Child" }, { title: "Second Child" }] }
        ]
      });
    });

    it("filters by simple properties", () => {
      let result   = store.where({ id: 1 });
      expect(result.length).toBe(1);
    });

    it("filters simple array properties", () => {
      let result = store.where({ tags: ["cool"] });
      expect(result.length).toBe(2);
    });

    it("filters complex array properties", () => {
      let result = store.where({ children: [{ title: "First Child" }] });
      expect(result.length).toBe(1);
    });

    it("filters child objects", () => {
      let result = store.where({ collection: { title: "col" } });
      expect(result.length).toBe(1);
    });

    it("returns an empty array when no matches are found", () => {
      let result = store.where({ tags: ["notfound"] });
      expect(result.length).toBe(0);
    });
  });

  describe("action handling", () => {
    var changeEvent;

    beforeEach(() => {
      changeEvent          = jest.genMockFunction();
      store.__emitter.emit = changeEvent;
    });

    it("responds to actions appropriately", () => {
      expect(store.has(1)).toBe(false);
      expect(store.get(1)).toBeUndefined();

      dispatcher.dispatch({
        actionType: Constants.Actions.MERGE_THINGS,
        items: [
          { id: 1, title: "My Product" }
        ]
      });

      expect(store.has(1)).toBe(true);
      expect(store.get(1).title).toBe("My Product");
    });

    it("only emits a single change event even with multiple values", () => {
      dispatcher.dispatch({
        actionType: Constants.Actions.MERGE_THINGS,
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
        actionType: Constants.Actions.MERGE_THINGS,
        items: [
          { id: 1, title: "My Product" }
        ]
      });

      expect(changeEvent.mock.calls.length).toBe(1);

      dispatcher.dispatch({
        actionType: Constants.Actions.MERGE_THINGS,
        items: [
          { id: 1, title: "My Product" }
        ]
      });

      expect(changeEvent.mock.calls.length).toBe(1);
    });

    it("clears the cache", () => {
      dispatcher.dispatch({
        actionType: Constants.Actions.MERGE_THINGS,
        items: [
          { id: 1, title: "My Product" }
        ]
      });

      expect(changeEvent.mock.calls.length).toBe(1);

      dispatcher.dispatch({ actionType: Constants.Actions.CLEAR_THINGS });

      expect(store.has(1)).toBe(false);
      expect(changeEvent.mock.calls.length).toBe(2);
    });
  });
});
