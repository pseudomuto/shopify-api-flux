"use strict";

import BaseStore  from "./BaseStore";
import ObjectHash from "object-hash";

/**
 * An object representing a resource query.
 *
 * Can be one of the following:
 *   * `number` - Assumes the value is a resource id
 *   * `string` - Assumes the value is a resource id
 *   * `object` - Will be converted to a query string
 * @typedef {number|string|object} ResourceQuery
 */

function hash(obj) {
  return ObjectHash.sha1(obj || {});
}

/**
 * A base class for resource stores that are countable (have /count.json endpoints).
 *
 * @extends {BaseStore}
 */
export default class extends BaseStore {
  /**
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   * @param {Actions} actions
   */
  constructor(dispatcher, actions) {
    super(dispatcher, actions);
    this._counts = {};
  }

  /**
   * Returns the count for the given query
   *
   * @param {ResourceQuery} [query]
   *
   * @return {number}
   */
  count(query) {
    return this._counts[hash(query)] || 0;
  }

  /**
   * @override
   */
  reduce(state, action) {
    if (action.actionType === this._actions.countAction) {
      this._counts[hash(action.query)] = action.count;
      this.__emitChange();
      return state;
    }

    return super.reduce(state, action);
  }
}
