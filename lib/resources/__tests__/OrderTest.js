"use strict";

jest.dontMock("../Base");
jest.dontMock("../Order");

describe("Order", () => {
  var resource = require("../Order");

  it("is countable", () => {
    expect(resource.apiMethods).toContain("fetchCount");
  });
});
