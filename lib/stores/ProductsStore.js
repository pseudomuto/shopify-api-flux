"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The products store
 *
 * @extends {CountableStore}
 */
class ProductsStore extends CountableStore {
  /**
   * Sets the the dispatcher and appropriate actions for products
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to regiter with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("products"));
  }
}

/** @ignore */
export default new ProductsStore(APIDispatcher);
