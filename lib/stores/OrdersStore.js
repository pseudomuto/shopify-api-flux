"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";
import Constants     from "../Constants";

class OrdersStore extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher, Constants.Actions.MERGE_ORDERS, Constants.Actions.CLEAR_ORDERS);
  }
}

export default new OrdersStore(APIDispatcher);
