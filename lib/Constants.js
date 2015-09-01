"use strict";

import keyMirror from "keymirror";

module.exports = {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Actions: keyMirror({
    SET_SHOP: null,
    CLEAR_SHOP: null,

    SET_SESSION: null,
    CLEAR_SESSION: null,

    MERGE_PRODUCTS: null,
    CLEAR_PRODUCTS: null,

    // FOR TESTING
    MERGE_THINGS: null,
    CLEAR_THINGS: null
  })
};
