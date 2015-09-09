"use strict";

// Actions is globally not mocked

import Constants from "../../Constants";

describe("Actions", () => {
  const Actions = require("../Actions");
  var actions;

  beforeEach(() => {
    actions = new Actions("products");
  });

  describe("#clearAction", () => {
    it("gets the value from Constants", () => {
      expect(actions.clearAction).toEqual(Constants.Actions.CLEAR_PRODUCTS);
    });
  });

  describe("#countAction", () => {
    it("gets the value from Constants", () => {
      expect(actions.countAction).toEqual(Constants.Actions.COUNT_PRODUCTS);
    });
  });

  describe("#mergeAction", () => {
    it("gets the value from Constants", () => {
      expect(actions.mergeAction).toEqual(Constants.Actions.MERGE_PRODUCTS);
    });
  });
});
