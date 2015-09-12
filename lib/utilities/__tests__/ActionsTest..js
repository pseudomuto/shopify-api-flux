"use strict";

import Actions   from "../Actions";
import Constants from "../../Constants";

describe("Actions", () => {
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

  describe("#destroyAction", () => {
    it("gets the value from Constants", () => {
      expect(actions.destroyAction).toEqual(Constants.Actions.DESTROY_PRODUCTS);
    });
  });
});
