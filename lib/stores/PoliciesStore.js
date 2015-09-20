"use strict";

import Actions       from "../utilities/Actions";
import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";

/**
 * The policies store
 *
 * @extends {BaseStore}
 */
class PoliciesStore extends BaseStore {
  /**
   * Sets the the dispatcher and appropriate actions for policies
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("policies"));
  }
}

/** @ignore */
export default new PoliciesStore(APIDispatcher);
