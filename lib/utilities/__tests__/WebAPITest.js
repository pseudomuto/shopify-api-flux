"use strict";

jest.dontMock("../WebAPI");

import Constants from "../../Constants";

describe("WebAPI", () => {
  var SessionStore, WebAPI;

  beforeEach(() => {
    SessionStore = require("../../stores/Sessions");
    WebAPI       = require("../WebAPI");

    SessionStore.getDomain.mockReturnValue("example.myshopify.com");
    SessionStore.getAccessToken.mockReturnValue("my_token");
  });

  describe("get", () => {
    var url, options;

    beforeEach(() => {
      WebAPI.get("/someurl", { body: JSON.stringify({ param: "value" }) });

      url     = fetch.mock.calls[0][0];
      options = fetch.mock.calls[0][1];
    });

    afterEach(() => {
      fetch.mockClear();
    });

    it("requests the specified URL using the GET method", () => {
      expect(url).toBe("https://example.myshopify.com/someurl");
      expect(options.method).toBe("get");
    });

    it("sends request body along with the request", () => {
      let body = JSON.stringify({ param: "value" });
      expect(options.body).toBe(body);
    });

    it("adds the shopify token header", () => {
      expect(options.headers[Constants.OAUTH_HEADER]).toBe("my_token");
    });
  });
});
