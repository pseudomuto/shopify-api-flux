"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import Base          from "./Base";
import Constants     from "../Constants";

class Orders extends Base {
  constructor(dispatcher) {
    super(dispatcher, Constants.Actions.MERGE_ORDERS, Constants.Actions.CLEAR_ORDERS);
  }
}

/** @ignore */
export default new Orders(APIDispatcher);
