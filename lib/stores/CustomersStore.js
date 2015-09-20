"use strict";

import Actions       from "../utilities/Actions";
import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";

/**
 * The customers store
 *
 * @extends {BaseStore}
 */
class CustomersStore extends BaseStore {
  /**
   * Sets the the dispatcher and appropriate actions for customers
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("customers"));
  }
}

/** @ignore */
export default new CustomersStore(APIDispatcher);
