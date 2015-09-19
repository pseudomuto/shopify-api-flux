"use strict";

jest.dontMock("../Base");
jest.dontMock("../Page");

describe("Page", () => {
  var resource = require("../Page");

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
