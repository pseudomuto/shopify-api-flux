"use strict";

jest.dontMock("../ResourceActions");

import Constants from "../../Constants";

describe("ResourceActions", () => {
  var actions, api, dispatcher;

  beforeEach(() => {
    api        = require("../../utilities/WebAPI");
    dispatcher = require("../../dispatcher/ApiDispatcher");

    const ResourceActions = require("../ResourceActions");
    actions = new ResourceActions("thing");
  });

  describe("mergeAction", () => {
    it("concatenates the collection name with MERGE", () => {
      expect(actions.mergeAction()).toBe(Constants.Actions.MERGE_THINGS);
    });
  });

  describe("clearAction", () => {
    it("concatenates the collection name with CLEAR", () => {
      expect(actions.clearAction()).toBe(Constants.Actions.CLEAR_THINGS);
    });
  });

  describe("urlFor", () => {
    describe("when given no parameters", () => {
      it("returns the collection's URI", () => {
        expect(actions.urlFor()).toBe("/admin/things.json");
      });
    });

    describe("when requesting a single resource", () => {
      it("returns the item's URI", () => {
        expect(actions.urlFor(1)).toBe("/admin/things/1.json");
      });
    });

    describe("when given an object", () => {
      it("parameterizes the object and adds it to the collection URI", () => {
        let query = `?ids=${encodeURIComponent("1,2,3")}`;
        expect(actions.urlFor({ ids: [1, 2, 3] })).toBe(`/admin/things.json${query}`);
      });
    });
  });

  describe("fetch", () => {
    var request;
    let actionType = Constants.Actions.MERGE_THINGS;

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
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, things: [thing] });
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
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, things });
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
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, things });
        });
      });
    });
  });
});
