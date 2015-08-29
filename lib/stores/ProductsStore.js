"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import BaseStore     from "./BaseStore";
import Constants     from "../Constants";

class ProductsStore extends BaseStore {
}

module.exports = new ProductsStore(ApiDispatcher);
