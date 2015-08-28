"use strict";

import keyMirror from "keymirror";

module.exports = {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Store: keyMirror({
    MERGE: null,
    CLEAR: null
  }),

  Session: keyMirror({
    SET_DOMAIN_AND_TOKEN: null
  }),

  Shop: keyMirror({
    SET_CURRENT: null
  }),

  Product: keyMirror({
    ADD_PRODUCTS: null,
    CLEAR: null
  }),

  Urls: {
    SHOP: "/admin/shop.json"
  }
};
