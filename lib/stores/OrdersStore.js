"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";
import Constants     from "../Constants";

/**
 * The Orders store
 *
 * @extends {BaseStore}
 */
class OrdersStore extends BaseStore {
  /**
   * Sets the merge and clear actions to MERGE_ORDERS and CLEAR_ORDERS respectively
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, Constants.Actions.MERGE_ORDERS, Constants.Actions.CLEAR_ORDERS);
  }
}

/** @ignore */
export default new OrdersStore(APIDispatcher);
