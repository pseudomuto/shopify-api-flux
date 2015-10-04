"use strict";

jest.dontMock("../Base");
jest.dontMock("../Location");

describe("Location", () => {
  var resource;

  beforeEach(() => {
    resource = require("../Location");
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
});
