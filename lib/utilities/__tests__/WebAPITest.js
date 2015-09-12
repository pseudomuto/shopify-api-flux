"use strict";

jest.dontMock("../WebAPI");

import Constants from "../../Constants";

function actsLikeAnAPICall(method, call) {
  describe("(Common Behavior)", () => {
    it(`requests the specified URL using the ${method.toUpperCase()} method`, () => {
      expect(call.url).toBe("https://example.myshopify.com/someurl");
      expect(call.options.method).toBe(method);
    });

    it("sets the user agent appropriately", () => {
      expect(call.options.headers["User-Agent"]).toBe("Shopify API Flux");
    });

    it("sets the accept header to application/json", () => {
      expect(call.options.headers["Accept"]).toBe("application/json");
    });

    it("sets the content type header to application/json", () => {
      expect(call.options.headers["Content-Type"]).toBe("application/json");
    });

    it("includes the shopify api header", () => {
      expect(call.options.headers[Constants.OAUTH_HEADER]).toBe("my_token");
    });
  });
}

describe("WebAPI", () => {
  var SessionStore, WebAPI;

  beforeEach(() => {
    SessionStore = require("../../stores/SessionStore");
    WebAPI       = require("../WebAPI");

    SessionStore.getDomain.mockReturnValue("example.myshopify.com");
    SessionStore.getAccessToken.mockReturnValue("my_token");
  });

  describe("get", () => {
    var call = {};

    beforeEach(() => {
      WebAPI.get("/someurl", { body: JSON.stringify({ param: "value" }) });

      call.url     = fetch.mock.calls[0][0];
      call.options = fetch.mock.calls[0][1];
    });

    actsLikeAnAPICall("get", call);

    it("sends request body along with the request", () => {
      let body = JSON.stringify({ param: "value" });
      expect(call.options.body).toBe(body);
    });
  });

  describe("post", () => {
    var call = {};

    beforeEach(() => {
      WebAPI.post("/someurl", { param: "value" });

      call.url     = fetch.mock.calls[0][0];
      call.options = fetch.mock.calls[0][1];
    });

    actsLikeAnAPICall("post", call);

    it("sends the resource as the request body", () => {
      let body = JSON.stringify({ param: "value" });
      expect(call.options.body).toBe(body);
    });
  });

  describe("put", () => {
    var call = {};

    beforeEach(() => {
      WebAPI.put("/someurl", { param: "value" });

      call.url     = fetch.mock.calls[0][0];
      call.options = fetch.mock.calls[0][1];
    });

    actsLikeAnAPICall("put", call);

    it("sends the resource as the request body", () => {
      let body = JSON.stringify({ param: "value" });
      expect(call.options.body).toBe(body);
    });
  });

  describe("delete", () => {
    var call = {};

    beforeEach(() => {
      WebAPI.delete("/someurl", { body: JSON.stringify({ param: "value" }) });

      call.url     = fetch.mock.calls[0][0];
      call.options = fetch.mock.calls[0][1];
    });

    actsLikeAnAPICall("delete", call);

    it("sends request body along with the request", () => {
      let body = JSON.stringify({ param: "value" });
      expect(call.options.body).toBe(body);
    });
  });
});
