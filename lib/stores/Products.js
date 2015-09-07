"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import Base          from "./Base";
import Constants     from "../Constants";

class Products extends Base {
  constructor(dispatcher) {
    super(dispatcher, Constants.Actions.MERGE_PRODUCTS, Constants.Actions.CLEAR_PRODUCTS);
  }
}

export default new Products(APIDispatcher);
