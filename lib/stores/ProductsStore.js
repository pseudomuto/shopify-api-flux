"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";
import Constants     from "../Constants";

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
    super(dispatcher, Constants.Actions.MERGE_PRODUCTS, Constants.Actions.CLEAR_PRODUCTS);
  }
}

/** @ignore */
export default new ProductsStore(APIDispatcher);
