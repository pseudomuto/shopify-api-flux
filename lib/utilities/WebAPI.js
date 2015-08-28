"use strict";

import Constants    from "../Constants";
import SessionStore from "../stores/SessionStore";

if (typeof(fetch) === undefined) {
  let fetch = require("whatwg-fetch");
}

function _performRequest(method, url, options) {
    options = (options || {});
    options.method = method;
    options.headers = (options.headers || {});
    options.headers[Constants.OAUTH_HEADER] = SessionStore.getAccessToken();

    return fetch(`https://${SessionStore.getDomain()}${url}`, options).then(response => {
      return response.json();
    });
  }

class WebAPI {
  get(url, options) {
    return _performRequest("get", url, options);
  }
}

module.exports = new WebAPI();
