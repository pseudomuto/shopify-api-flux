"use strict";

import keyMirror from "keymirror";

export default {
  OAUTH_HEADER: "X-Shopify-Access-Token",

  Actions: keyMirror({
    SET_SHOP: null,
    CLEAR_SHOP: null,

    SET_SESSION: null,
    CLEAR_SESSION: null,

    MERGE_BLOGS: null,
    CLEAR_BLOGS: null,
    COUNT_BLOGS: null,
    DESTROY_BLOGS: null,

    MERGE_COUNTRIES: null,
    CLEAR_COUNTRIES: null,
    COUNT_COUNTRIES: null,
    DESTROY_COUNTRIES: null,

    MERGE_ORDERS: null,
    CLEAR_ORDERS: null,
    COUNT_ORDERS: null,
    DESTROY_ORDERS: null,

    MERGE_PAGES: null,
    CLEAR_PAGES: null,
    COUNT_PAGES: null,
    DESTROY_PAGES: null,

    MERGE_PRODUCTS: null,
    CLEAR_PRODUCTS: null,
    COUNT_PRODUCTS: null,
    DESTROY_PRODUCTS: null,

    MERGE_REDIRECTS: null,
    CLEAR_REDIRECTS: null,
    COUNT_REDIRECTS: null,
    DESTROY_REDIRECTS: null,

    MERGE_WEBHOOKS: null,
    CLEAR_WEBHOOKS: null,
    COUNT_WEBHOOKS: null,
    DESTROY_WEBHOOKS: null,

    // FOR TESTING
    MERGE_THINGS: null,
    CLEAR_THINGS: null,
    COUNT_THINGS: null,
    DESTROY_THINGS: null
  })
};
