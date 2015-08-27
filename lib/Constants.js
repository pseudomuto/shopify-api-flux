"use strict";

import keyMirror from "keymirror";

module.exports = {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Auth: keyMirror({
    SET_AUTH_TOKEN: null
  }),

  Shop: keyMirror({
    SET_CURRENT: null
  }),

  Urls: {
    SHOP: "/admin/shop.json"
  }
};
