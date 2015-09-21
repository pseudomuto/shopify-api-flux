"use strict";

jest.dontMock("../Base");
jest.dontMock("../Policy");

describe("Policy", () => {
  var resource;

  beforeEach(() => {
    resource = require("../Policy");
  });

  it("is not countable", () => {
    expect(resource.apiMethods).not.toContain("fetchCount");
  });

  it("is not createable", () => {
    expect(resource.apiMethods).not.toContain("create");
    expect(resource.apiMethods).not.toContain("update");
  });

  it("is not destroyable", () => {
    expect(resource.apiMethods).not.toContain("destroy");
  });

  describe("fetch", () => {
    var api;

    beforeEach(() => {
      api = require("../../utilities/WebAPI");
      stubRequest(api, "get", { policies: [] });
    });

    it("ignores any parameters", () => {
      resource.fetch(1);
      resource.fetch({ query: "param" });

      expect(api.get.mock.calls.length).toBe(2);
      expect(api.get).toBeCalledWith("/admin/policies.json");
    });
  });
});
