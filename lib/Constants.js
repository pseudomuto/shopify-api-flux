"use strict";

import keyMirror from "keymirror";

export default {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Actions: keyMirror({
    SET_SHOP: null,
    CLEAR_SHOP: null,

    SET_SESSION: null,
    CLEAR_SESSION: null,

    MERGE_ORDERS: null,
    CLEAR_ORDERS: null,
    COUNT_ORDERS: null,
    DESTROY_ORDERS: null,

    MERGE_PRODUCTS: null,
    CLEAR_PRODUCTS: null,
    COUNT_PRODUCTS: null,
    DESTROY_PRODUCTS: null,

    // FOR TESTING
    MERGE_THINGS: null,
    CLEAR_THINGS: null,
    COUNT_THINGS: null,
    DESTROY_THINGS: null
  })
};
