"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";
import Constants     from "../Constants";

class ProductsStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher, Constants.Actions.MERGE_PRODUCTS, Constants.Actions.CLEAR_PRODUCTS);
  }
}

export default new ProductsStore(APIDispatcher);
