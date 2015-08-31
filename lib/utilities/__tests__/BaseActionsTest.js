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

  describe("#urlFor", () => {
    describe("when given no parameters", () => {
      it("returns the collection's URI", () => {
        expect(actions.urlFor()).toBe("/admin/things.json");
      });
    });

    describe("when requesting a single resource", () => {
      it("returns the item's URI when passed a number", () => {
        expect(actions.urlFor(1)).toBe("/admin/things/1.json");
      });

      it("returns the item's URI when passed a string", () => {
        expect(actions.urlFor("1")).toBe("/admin/things/1.json");
      });
    });

    describe("when given an object", () => {
      it("parameterizes the object and adds it to the collection URI", () => {
        let query = `?ids=${encodeURIComponent("1,2,3")}`;
        expect(actions.urlFor({ ids: [1, 2, 3] })).toBe(`/admin/things.json${query}`);
      });
    });
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
