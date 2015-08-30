"use strict";

import API from "./utilities/ActionProxy";

module.exports = {
  Product: new API(require("./actions/ProductActions"), require("./stores/ProductsStore")),
  Session: new API(require("./actions/SessionActions"), null),
  Shop: new API(require("./actions/ShopActions"), require("./stores/ShopStore"))
};
