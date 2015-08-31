"use strict";

jest.dontMock("../BaseActions");

import Constants from "../../Constants";
import _         from "lodash";

describe("BaseActions", () => {
  var actions, dispatcher;

  beforeEach(() => {
    const BaseActions = require("../BaseActions");

    actions    = new BaseActions("thing");
    dispatcher = require("../../dispatcher/ApiDispatcher");
  });

  describe("#clear", () => {
    beforeEach(() => actions.clear());

    it("dispatches the proper action", () => {
      let actionType = Constants.Actions.CLEAR_THINGS;
      expect(dispatcher.dispatch).toBeCalledWith({ actionType });
    });
  });

  describe(".actionMethods", () => {
    var klass;

    beforeEach(() => {
      klass = actions.constructor;
    });

    it("returns all exported action method names", () => {
      expect(klass.actionMethods).toContain("clear");
    });

    it("can be overridden in subclasses", () => {
      class Test extends klass {
        static get actionMethods() {
          return _.union(super.actionMethods, ["testMethod"]);
        }
      }

      expect(Test.actionMethods).toContain("clear");
      expect(Test.actionMethods).toContain("testMethod");
    });
  });
});
