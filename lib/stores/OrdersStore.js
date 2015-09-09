"use strict";

import Actions       from "../utilities/Actions";
import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";

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
    super(dispatcher, new Actions("orders"));
  }
}

/** @ignore */
export default new OrdersStore(APIDispatcher);
