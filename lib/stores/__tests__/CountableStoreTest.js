"use strict";

jest.dontMock("flux/utils");
jest.dontMock("../../dispatcher/APIDispatcher");
jest.dontMock("../BaseStore");
jest.dontMock("../CountableStore");

import Actions   from "../../utilities/Actions";
import Constants from "../../Constants";

const CountableStore = require("../CountableStore");

describe("CountableStore", () => {
  var store, dispatcher;

  class ThingsStore extends CountableStore {
    constructor(dispatcher) {
      super(dispatcher, new Actions("things"));
    }
  }

  beforeEach(() => {
    dispatcher = require("../../dispatcher/APIDispatcher");
    store      = new ThingsStore(dispatcher);
  });

  describe("action handling", () => {
    var changeEvent;

    beforeEach(() => {
      changeEvent          = jest.genMockFunction();
      store.__emitter.emit = changeEvent;
    });

    describe("count", () => {
      beforeEach(() => {
        dispatcher.dispatch({
          actionType: Constants.Actions.COUNT_THINGS,
          count: 10
        });
      });

      it("stores the count", () => {
        expect(store.count()).toBe(10);
      });

      it("differentiates between queries", () => {
        dispatcher.dispatch({
          actionType: Constants.Actions.COUNT_THINGS,
          count: 20,
          query: { test: "value" }
        });

        expect(store.count()).toBe(10);
        expect(store.count({ test: "value" })).toBe(20);
      });

      it("triggers the change event", () => {
        expect(changeEvent.mock.calls.length).toBe(1);
      });
    });
  });

  describe("#count", () => {
    it("returns the count for the specified query", () => {
      dispatcher.dispatch({
        actionType: Constants.Actions.COUNT_THINGS,
        count: 10,
        query: { test: "some value" }
      });

      expect(store.count({ test: "some value" })).toBe(10);
    });

    it("doesn't care about key order", () => {
      dispatcher.dispatch({
        actionType: Constants.Actions.COUNT_THINGS,
        count: 4,
        query: { a: 1, b: 2}
      });

      expect(store.count({ b: 2, a: 1 })).toBe(4);
    });

    it("returns 0 when no results exist", () => {
      expect(store.count()).toBe(0);
    });

    it("return 0 when query is falsy", () => {
      expect(store.count()).toBe(0);
      expect(store.count(null)).toBe(0);
      expect(store.count(undefined)).toBe(0);
      expect(store.count("")).toBe(0);
    });
  });
});
