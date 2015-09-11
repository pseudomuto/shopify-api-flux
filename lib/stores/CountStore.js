"use strict";

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
 * A store for maintaining resource counts for specific queries.
 *
 * This class will handle tracking counts returned from API calls like /admin/products/count.json by storing a hashed
 * version of the query used to query the API.
 *
 * @example
 * import CountStore from "./CountStore";
 *
 * let store = new CountStore();
 *
 * // results from /admin/products/count.json?a=1&b=2
 * store.set({ a: 1, b: 2 }, 10);
 *
 * // notice the the order of the keys doesn't matter
 * store.get({ b: 2, a: 1 }) === 10
 */
export default class {
  constructor() {
    this._cache = {};
  }

  /**
   * Returns the number of queries stored
   *
   * @readonly
   * @return {number}
   */
  get length() {
    return Object.keys(this._cache).length;
  }

  /**
   * Returns the count for the specified query
   *
   * @param {ResourceQuery} [query]
   *
   * @return {number} The count, or 0 when not found
   */
  get(query) {
    return this._cache[hash(query)] || 0;
  }

  /**
   * Sets the count for the specified query
   *
   * @param {ResourceQuery} query
   * @param {number} count
   */
  set(query, count) {
    this._cache[hash(query)] = count;
  }
}
