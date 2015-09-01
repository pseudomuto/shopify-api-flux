"use strict";

import APIProxy from "./utilities/APIProxy";

module.exports = {
  Product:  new APIProxy(require("./actions/ProductActions"), require("./stores/ProductsStore")),
  Session:  new APIProxy(require("./actions/SessionActions"), null),
  Shop:     new APIProxy(require("./actions/ShopActions"), require("./stores/ShopStore"))
};
