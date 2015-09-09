"use strict";

jest.dontMock("../CountStore");

describe("CountCache", () => {
  const CountStore = require("../CountStore");

  var store;

  beforeEach(() => {
    store = new CountStore();
  });

  describe("#get", () => {
    it("returns the count for the specified query", () => {
      store.set({ test: "some value" }, 10);
      expect(store.get({ test: "some value" })).toBe(10);
    });

    it("doesn't care about key order", () => {
      store.set({ a: 1, b: 2 }, 4);
      expect(store.get({ b: 2, a: 1 })).toBe(4);
    });

    it("returns 0 when no results exist", () => {
      expect(store.get({})).toBe(0);
    });

    it("return 0 when query is falsy", () => {
      expect(store.get()).toBe(0);
      expect(store.get(null)).toBe(0);
      expect(store.get(undefined)).toBe(0);
      expect(store.get("")).toBe(0);
    });
  });

  describe("#set", () => {
    it("sets the count for the object", () => {
      let key = { user: "pseudomuto" };
      store.set(key, 10);
      expect(store.get(key)).toBe(10);
    });

    it("ignores key order when setting a value", () => {
      store.set({ a: 1, b: 2 }, 10);
      store.set({ b: 2, a: 1 }, 1);

      expect(store.get({ a: 1, b: 2 })).toBe(1);
    });

    it("handles empty objects without issue", () => {
      store.set({}, 1);
      expect(store.get({})).toBe(1);
    });
  });

  describe("#length", () => {
    it("returns the number of items in the store", () => {
      store.set({ test: 1 }, 1000);
      store.set({ test: 2 }, 1);

      expect(store.length).toBe(2);
    });

    it("returns 0 when no items exist", () => {
      expect(store.length).toBe(0);
    });
  });
});
