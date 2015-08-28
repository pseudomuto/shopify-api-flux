"use strict";

import Constants  from "../Constants";
import TokenStore from "../stores/TokenStore";

if (typeof(fetch) === undefined) {
  let fetch = require("whatwg-fetch");
}

function _performRequest(method, url, options) {
    options = (options || {});
    options.method = method;
    options.headers = (options.headers || {});
    options.headers[Constants.OAUTH_HEADER] = TokenStore.getAccessToken();

    return fetch(url, options);
  }

class WebAPI {
  get(url, options) {
    return _performRequest("get", url, options);
  }
}

module.exports = new WebAPI();
