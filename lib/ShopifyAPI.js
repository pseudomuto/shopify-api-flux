"use strict";

module.exports = {
  // actions (API)
  Products:  require("./actions/ProductActions"),
  Session:   require("./actions/SessionActions"),
  Shop:      require("./actions/ShopActions"),

  // stores
  ProductsStore:  require("./stores/ProductsStore"),
  ShopStore:      require("./stores/ShopStore")
};
