"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import BaseStore     from "./BaseStore";
import Constants     from "../Constants";

class ProductsStore extends BaseStore {
  mergeAction() {
    return Constants.Actions.MERGE_PRODUCTS;
  }

  clearAction() {
    return Constants.Actions.CLEAR_PRODUCTS;
  }
}

module.exports = new ProductsStore(ApiDispatcher);
