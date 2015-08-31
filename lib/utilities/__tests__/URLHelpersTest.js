"use strict";

jest.dontMock("../URLHelpers");

describe("URLHelpers", () => {
  var helpers = require("../URLHelpers");

  describe("#toQueryString", () => {
    it("returns falsy when the query is falsy", () => {
      expect(helpers.toQueryString()).toBeFalsy();
      expect(helpers.toQueryString("")).toBeFalsy();
      expect(helpers.toQueryString(0)).toBeFalsy();
      expect(helpers.toQueryString(null)).toBeFalsy();
      expect(helpers.toQueryString(undefined)).toBeFalsy();
    });

    it("makes a query parameter for simple properties", () => {
      let query = { num: 0, type: "thing" };
      expect(helpers.toQueryString(query)).toBe("num=0&type=thing");
    });

    it("encodes query param values", () => {
      let query = { type: "this-is&something special" };
      expect(helpers.toQueryString(query)).toBe("type=this-is%26something%20special");
    });

    it("encodes arrays as comma-delimited strings", () => {
      let query = { ids: [1, 2, 3] };
      expect(helpers.toQueryString(query)).toBe("ids=1%2C2%2C3");
    });
  });
});
