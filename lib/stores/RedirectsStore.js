"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The redirects store
 *
 * @extends {CountableStore}
 */
class RedirectsStore extends CountableStore {
  /**
   * Sets the the dispatcher and appropriate actions for redirects
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("redirects"));
  }
}

/** @ignore */
export default new RedirectsStore(APIDispatcher);
