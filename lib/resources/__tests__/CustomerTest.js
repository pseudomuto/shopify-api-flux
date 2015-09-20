"use strict";

jest.dontMock("../Base");
jest.dontMock("../Customer");

describe("Customer", () => {
  var resource = require("../Customer");

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
