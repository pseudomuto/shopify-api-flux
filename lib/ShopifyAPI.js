"use strict";

import APIProxy from "./utilities/APIProxy";

export default {
  Order:    new APIProxy(require("./resources/Order"), require("./stores/Orders")),
  Product:  new APIProxy(require("./resources/Product"), require("./stores/Products")),
  Session:  new APIProxy(require("./resources/Session"), require("./stores/Sessions")),
  Shop:     new APIProxy(require("./resources/Shop"), require("./stores/Shops"))
};
