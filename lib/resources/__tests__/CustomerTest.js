"use strict";

jest.dontMock("../Base");
jest.dontMock("../Customer");
jest.dontMock("../../utilities/URLHelpers");

import Constants from "../../Constants";

describe("Customer", () => {
  var resource;

  beforeEach(() => {
    resource = require("../Customer");
  });

  it("is countable", () => {
    expect(resource.apiMethods).toContain("fetchCount");
  });

  it("is createable", () => {
    expect(resource.apiMethods).toContain("create");
    expect(resource.apiMethods).toContain("update");
  });

  it("is destroyable", () => {
    expect(resource.apiMethods).toContain("destroy");
  });

  it("exports the search method", () => {
    expect(resource.apiMethods).toContain("search");
  });

  describe("custom actions", () => {
    let actionType = Constants.Actions.MERGE_CUSTOMERS;
    let customer   = { id: 1, name: "Bob" }

    var api, request, dispatcher;

    beforeEach(() => {
      api        = require("../../utilities/WebAPI");
      dispatcher = require("../../dispatcher/APIDispatcher");
    });

    describe("#search", () => {
      beforeEach(() => {
        stubRequest(api, "get", { customers: [customer] });
        request = resource.search({ query: "Bob country:United States" });
      });

      it("fetches the correct URL", () => {
        expect(api.get).toBeCalledWith("/admin/customers/search.json?query=Bob%20country%3AUnited%20States");
      });
    });
  });
});
