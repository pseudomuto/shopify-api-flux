"use strict";

jest.dontMock("../Base");
jest.dontMock("../Blog");

describe("Blog", () => {
  var resource = require("../Blog");

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
});
