"use strict";

import Actions       from "../utilities/Actions";
import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";

/**
 * The products store
 *
 * @extends {BaseStore}
 */
class ProductsStore extends BaseStore {
  /**
   * Sets the merge and clear actions to MERGE_PRODUCTS and CLEAR_PRODUCTS respectively
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to regiter with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("products"));
  }
}

/** @ignore */
export default new ProductsStore(APIDispatcher);
