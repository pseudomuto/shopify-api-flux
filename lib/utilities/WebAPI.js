"use strict";

import Constants  from "../Constants";
import Fetch      from "node-fetch";
import TokenStore from "../stores/TokenStore";

function _performRequest(method, url, options) {
    options = (options || {});
    options.method = method;
    options.headers = (options.headers || {});
    options.headers[Constants.OAUTH_HEADER] = TokenStore.getAccessToken();

    return Fetch(url, options);
  }

class WebAPI {
  get(url, options) {
    return _performRequest("get", url, options);
  }
}

module.exports = new WebAPI();
