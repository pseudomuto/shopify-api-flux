"use strict";

jest.dontMock("../Base");
jest.dontMock("../Theme");

describe("Theme", () => {
  var resource = require("../Theme");

  it("is not countable", () => {
    expect(resource.apiMethods).not.toContain("fetchCount");
  });

  it("is createable", () => {
    expect(resource.apiMethods).toContain("create");
    expect(resource.apiMethods).toContain("update");
  });

  it("is destroyable", () => {
    expect(resource.apiMethods).toContain("destroy");
  });
});
