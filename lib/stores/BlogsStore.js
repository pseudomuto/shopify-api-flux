"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The blogs store
 *
 * @extends {CountableStore}
 */
class BlogsStore extends CountableStore {
  /**
   * Sets the the dispatcher and appropriate actions for blogs
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("blogs"));
  }
}

/** @ignore */
export default new BlogsStore(APIDispatcher);
