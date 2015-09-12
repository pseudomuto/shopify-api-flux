"use strict";

jest.dontMock("../Base");
jest.dontMock("../../utilities/URLHelpers");

import Constants from "../../Constants";

describe("Base", () => {
  var Base, actions, dispatcher;

  beforeEach(() => {
    Base       = require("../Base");
    actions    = new Base("thing");
    dispatcher = require("../../dispatcher/APIDispatcher");
  });

  describe("#apiMethods", () => {
    it("returns all exported action method names", () => {
      expect(actions.apiMethods).toContain("clear");
      expect(actions.apiMethods).toContain("fetch");
      expect(actions.apiMethods).not.toContain("fetchCount");
      expect(actions.apiMethods).not.toContain("create");
      expect(actions.apiMethods).not.toContain("update");
    });

    it("includes fetchCount when the resource is countable", () => {
      let countableResource = new Base("thing", { countable: true });
      expect(countableResource.apiMethods).toContain("fetchCount");
    });

    it("includes create/update when the resource is createable", () => {
      let countableResource = new Base("thing", { createable: true });
      expect(countableResource.apiMethods).toContain("create");
      expect(countableResource.apiMethods).toContain("update");
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
        stubRequest(api, "get", { thing });
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
        stubRequest(api, "get", { things });
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
        stubRequest(api, "get", { things });
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

  describe("#fetchCount", () => {
    let count      = 10;
    let actionType = Constants.Actions.COUNT_THINGS;

    var api, request;

    beforeEach(() => {
      api = require("../../utilities/WebAPI");
      stubRequest(api, "get", { count });
    });

    describe("when called without parameters", () => {
      beforeEach(() => {
        request = actions.fetchCount();
      });

      it("fetches the correct endpoint", () => {
        expect(api.get).toBeCalledWith("/admin/things/count.json");
      });

      pit("dispatches the count action", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, count, query: undefined });
        });
      });
    });

    describe("when called with query parameter", () => {
      let query = { type: "test", a: 1 };

      beforeEach(() => {
        request = actions.fetchCount(query);
      });

      it("fetches the correct endpoint", () => {
        expect(api.get).toBeCalledWith("/admin/things/count.json?type=test&a=1");
      });

      pit("dispatches the count action", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, count, query });
        });
      });
    });
  });

  describe("#create", () => {
    let actionType = Constants.Actions.MERGE_THINGS;
    let thing      = { id: 1, title: "Some Product" };

    var api, request;

    beforeEach(() => {
      api = require("../../utilities/WebAPI");
      stubRequest(api, "post", { thing });
      request = actions.create(thing);
    });

    it("posts to the correct endpoint", () => {
      expect(api.post).toBeCalledWith("/admin/things.json", thing, undefined);
    });

    pit("dispatches the merge action on success", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: [thing] });
      });
    });

    describe("when supplied with options", () => {
      it("passes options to the fetch call", () => {
        let options = { headers: { "Content-Type": "application/thing" } };
        request     = actions.create(thing, options);

        expect(api.post).toBeCalledWith("/admin/things.json", thing, options);
      });
    });
  });

  describe("#update", () => {
    let actionType = Constants.Actions.MERGE_THINGS;
    let thing      = { id: 1, title: "Some Product" };

    var api, request;

    beforeEach(() => {
      api = require("../../utilities/WebAPI");
      stubRequest(api, "put", { thing });
      request = actions.update(1, thing);
    });

    it("requests the correct endpoint", () => {
      expect(api.put).toBeCalledWith("/admin/things/1.json", thing, undefined);
    });

    pit("dispatches the merge action on success", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: [thing] });
      });
    });

    describe("when supplied with options", () => {
      it("passes options to the fetch call", () => {
        let options = { headers: { "Content-Type": "application/thing" } };
        request     = actions.update(1, thing, options);

        expect(api.put).toBeCalledWith("/admin/things/1.json", thing, options);
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

      it("appends params object as query string when supplied", () => {
        expect(actions.urlFor(1, { type: "thing" })).toBe("/admin/things/1.json?type=thing");
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
