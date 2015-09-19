"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The webhooks store
 *
 * @extends {CountableStore}
 */
class WebhooksStore extends CountableStore {
  /**
   * Sets the the dispatcher and appropriate actions for webhooks
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("webhooks"));
  }
}

/** @ignore */
export default new WebhooksStore(APIDispatcher);
