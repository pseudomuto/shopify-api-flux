"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The Orders store
 *
 * @extends {CountableStore}
 */
class OrdersStore extends CountableStore {
  /**
   * Sets the dispatcher and appropriate actions for orders
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("orders"));
  }
}

/** @ignore */
export default new OrdersStore(APIDispatcher);
