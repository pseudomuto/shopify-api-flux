"use strict";

import ShopifyAPIError from "../ShopifyAPIError";

describe("ShopifyAPIError", () => {
  var error;

  beforeEach(() => {
    error = new ShopifyAPIError({ status: 200, statusText: "Status Text" });
  });

  it("defines a name property as the exception type", () => {
    expect(error.name).toBe("ShopifyAPIError");
  });

  it("copies the status from the response", () => {
    expect(error.status).toBe(200);
  });

  it("sets the message property", () => {
    expect(error.message).toEqual("API Error (200): Status Text");
  });
});
