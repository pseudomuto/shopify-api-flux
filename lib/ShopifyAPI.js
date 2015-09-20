"use strict";

import APIProxy from "./utilities/APIProxy";

export default {
  Blog:      new APIProxy(require("./resources/Blog"), require("./stores/BlogsStore")),
  Country:   new APIProxy(require("./resources/Country"), require("./stores/CountriesStore")),
  Order:     new APIProxy(require("./resources/Order"), require("./stores/OrdersStore")),
  Page:      new APIProxy(require("./resources/Page"), require("./stores/PagesStore")),
  Product:   new APIProxy(require("./resources/Product"), require("./stores/ProductsStore")),
  Redirect:  new APIProxy(require("./resources/Redirect"), require("./stores/RedirectsStore")),
  Session:   new APIProxy(require("./resources/Session"), require("./stores/SessionStore")),
  Shop:      new APIProxy(require("./resources/Shop"), require("./stores/ShopStore")),
  Webhook:   new APIProxy(require("./resources/Webhook"), require("./stores/WebhooksStore"))
};
