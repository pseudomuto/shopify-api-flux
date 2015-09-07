"use strict";

jest.dontMock("../Base");
jest.dontMock("../../utilities/URLHelpers");

import Constants from "../../Constants";

describe("BaseActions", () => {
  var actions, dispatcher;

  beforeEach(() => {
    const BaseActions = require("../Base");

    actions    = new BaseActions("thing");
    dispatcher = require("../../dispatcher/APIDispatcher");
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
          return super.actionMethods.concat(["testMethod"]);
        }
      }

      expect(Test.actionMethods).toContain("clear");
      expect(Test.actionMethods).toContain("testMethod");
    });
  });

  describe("#fetch", () => {
    var api, request;
    let actionType = Constants.Actions.MERGE_THINGS;

    beforeEach(() => {
      api = require("../../utilities/WebAPI");
    });

    describe("when passed a single id", () => {
      let thing = { id: 1, title: "Some Product" };

      beforeEach(() => {
        stubFetchRequest(api, { thing });
        request = actions.fetch(1);
      });

      it("fetches the single resource", () => {
        expect(api.get).toBeCalledWith("/admin/things/1.json");
      });

      pit("dispatches the correct merge action", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: [thing] });
        });
      });
    });

    describe("when passed an object", () => {
      let things = [{ id: 1, title: "Some Product" }];

      beforeEach(() => {
        stubFetchRequest(api, { things });
        request = actions.fetch({ ids: [1, 2, 3] });
      });

      it("fetches the resource collection with the appropriate query", () => {
        let encodedQuery = `ids=${encodeURIComponent("1,2,3")}`;
        expect(api.get).toBeCalledWith(`/admin/things.json?${encodedQuery}`);
      });

      pit("dispatches the correct merge event", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: things });
        });
      });
    });

    describe("when called without parameters", () => {
      let things = [
        { id: 1, title: "First Product" },
        { id: 2, title: "Second Product" }
      ];

      beforeEach(() => {
        stubFetchRequest(api, { things });
        request = actions.fetch();
      });

      it("fetches the resource collection", () => {
        expect(api.get).toBeCalledWith("/admin/things.json");
      });

      pit("dispatches the correct merge action", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: things });
        });
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

  describe("#urlFor", () => {
    var helpers = require("../../utilities/URLHelpers");

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
        let query = helpers.toQueryString({ ids: [1, 2, 3] });
        expect(actions.urlFor({ ids: [1, 2, 3] })).toBe(`/admin/things.json?${query}`);
      });
    });
  });
});
