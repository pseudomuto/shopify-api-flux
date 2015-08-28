"use strict";

import keyMirror from "keymirror";

module.exports = {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Session: keyMirror({
    SET_DOMAIN_AND_TOKEN: null
  }),

  Shop: keyMirror({
    SET_CURRENT: null
  }),

  Urls: {
    SHOP: "/admin/shop.json"
  }
};
