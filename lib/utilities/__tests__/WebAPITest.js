"use strict";

jest.dontMock("../WebAPI");

import Constants from "../../Constants";

describe("WebAPI", () => {
  var Fetch, TokenStore, WebAPI;

  beforeEach(() => {
    Fetch      = require("node-fetch");
    TokenStore = require("../../stores/TokenStore");
    WebAPI     = require("../WebAPI");

    TokenStore.getAccessToken.mockReturnValue("my_token");
  });

  describe("get", () => {
    var url, options;

    beforeEach(() => {
      WebAPI.get("/someurl", { body: JSON.stringify({ param: "value" }) });

      url     = Fetch.mock.calls[0][0];
      options = Fetch.mock.calls[0][1];
    });

    it("requests the specified URL using the GET method", () => {
      expect(url).toBe("/someurl");
      expect(options.method).toBe("get");
    });

    it("sends request body along with the request", () => {
      expect(options.body).toBe('{"param":"value"}');
    });

    it("adds the shopify token header", () => {
      expect(options.headers[Constants.OAUTH_HEADER]).toBe("my_token");
    });
  });
});
