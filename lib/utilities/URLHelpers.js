"use strict";

export default {
  toQueryString(query) {
    if (!query) {
      return "";
    }

    return Object.keys(query).map(key => `${key}=${encodeURIComponent(query[key])}`).join("&");
  }
};
