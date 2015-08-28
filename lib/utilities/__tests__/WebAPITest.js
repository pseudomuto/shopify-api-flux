"use strict";

jest.dontMock("../WebAPI");

import Constants from "../../Constants";

describe("WebAPI", () => {
  var TokenStore, WebAPI;

  beforeEach(() => {
    TokenStore = require("../../stores/TokenStore");
    WebAPI     = require("../WebAPI");

    TokenStore.getAccessToken.mockReturnValue("my_token");
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
