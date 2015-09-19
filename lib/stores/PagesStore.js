"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The pages store
 *
 * @extends {CountableStore}
 */
class PagesStore extends CountableStore {
  /**
   * Sets the the dispatcher and appropriate actions for pages
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("pages"));
  }
}

/** @ignore */
export default new PagesStore(APIDispatcher);
