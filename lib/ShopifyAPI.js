"use strict";

import APIProxy from "./utilities/APIProxy";

export default {
  Country:  new APIProxy(require("./resources/Country"), require("./stores/CountriesStore")),
  Order:    new APIProxy(require("./resources/Order"), require("./stores/OrdersStore")),
  Product:  new APIProxy(require("./resources/Product"), require("./stores/ProductsStore")),
  Session:  new APIProxy(require("./resources/Session"), require("./stores/SessionStore")),
  Shop:     new APIProxy(require("./resources/Shop"), require("./stores/ShopStore"))
};
