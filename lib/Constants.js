"use strict";

import keyMirror from "keymirror";

module.exports = {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Actions: keyMirror({
    MERGE_PRODUCTS: null,
    CLEAR_PRODUCTS: null,

    SET_SHOP: null,
    CLEAR_SHOP: null,

    // FOR TESTING
    MERGE_THINGS: null,
    CLEAR_THINGS: null
  }),

  Session: keyMirror({
    SET_DOMAIN_AND_TOKEN: null
  })
};
