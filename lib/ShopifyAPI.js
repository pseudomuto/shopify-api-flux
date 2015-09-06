"use strict";

import APIProxy from "./utilities/APIProxy";

export default {
  Order:    new APIProxy(require("./actions/OrderActions"), require("./stores/OrdersStore")),
  Product:  new APIProxy(require("./actions/ProductActions"), require("./stores/ProductsStore")),
  Session:  new APIProxy(require("./actions/SessionActions"), require("./stores/SessionStore")),
  Shop:     new APIProxy(require("./actions/ShopActions"), require("./stores/ShopStore"))
};
