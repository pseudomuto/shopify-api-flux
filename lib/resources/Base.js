"use strict";

import Api           from "../utilities/WebAPI";
import APIDispatcher from "../dispatcher/APIDispatcher";
import Constants     from "../Constants";
import URLHelpers    from "../utilities/URLHelpers";

function isPrimitive(value) {
  return ["number", "string"].indexOf(typeof value) >= 0;
}

/**
 * An object representing a resource query.
 *
 * Can be one of the following:
 *   * `number`, `string` - Assumes the value is a resource id
 *   * `object`           - Will be converted to a query string
 * @typedef {number|string|object} ResourceQuery
 */

/**
 * A base class for API resources. This class is meant to be subclassed and have it's `apiMethods` method overridden to
 * include all methods that should be made available to consumers.
 *
 * @example
 * import Base from "./Base";
 *
 * class Thing extends Base {
 *   constructor() {
 *     super("thing")
 *   }
 *
 *   static get apiMethods() {
 *     return super.apiMethods.concat(["fetchAllTheThings"]);
 *   }
 *
 *   fetchAllTheThings() {
 *     return this.fetch("/admin/things.json");
 *   }
 * }
 */
export default class {
  /**
   * Using the supplied `resourceName`, this constructor will generate the singular and plural names for this resource
   * which will be used to infer the merge and clear actions to be dispatched.
   *
   * @param {string} resourceName - The singular name for the resource (e.g. `product`)
   */
  constructor(resourceName) {
    this._resource     = resourceName;
    this._resources    = `${resourceName}s`;
    this._mergeAction  = Constants.Actions[`MERGE_${this._resources.toUpperCase()}`];
    this._clearAction  = Constants.Actions[`CLEAR_${this._resources.toUpperCase()}`];
  }

  /**
   * An array of methods to be exposed via {@link APIProxy}
   *
   * @return {Array<string>} The names of all methods to be made available
   */
  static get apiMethods() {
    return ["clear", "fetch"];
  }

  /**
   * Performs a GET request for the specified query.
   *
   * @param {ResourceQuery} [query]
   *
   * @return {RequestPromise}
   */
  fetch(query) {
    let url      = this.urlFor(query);
    let dispatch = this._dispatchMerge.bind(this);
    let resource = isPrimitive(query) ? this._resource : this._resources;

    return Api.get(url).then(response => dispatch(response[resource]));
  }

  /**
   * Dispatches the clear action for this resource. The action will be handled by the appropriate store.
   */
  clear() {
    APIDispatcher.dispatch({ actionType: this._clearAction });
  }

  /**
   * @protected
   * Generates a resource URL for the specified query. The query can be an id, or an object to be converted to a query
   * string.
   *
   * @param {ResourceQuery} [query]
   *
   * @return {string} The resource URL for the specified query
   *
   * @example
   * import Base from "./Base";
   *
   * let instance = new Base("product");
   *
   * instance.urlFor();                            // `/admin/products.json`
   * instance.urlFor(1);                           // `/admin/products/1.json`
   * instance.urlFor("1");                         // `/admin/products/1.json`
   * instance.urlFor({ fields: ["id", "title"] }); // `/admin/products.json?fields=id,title
   */
  urlFor(query) {
    if (isPrimitive(query)) {
      return `/admin/${this._resources}/${query}.json`;
    }

    let url    = `/admin/${this._resources}.json`;
    let params = URLHelpers.toQueryString(query);
    return params ? `${url}?${params}` : url;
  }

  _dispatchMerge(items) {
    if (!Array.isArray(items)) {
      items = [items];
    }

    let actionType = this._mergeAction;
    APIDispatcher.dispatch({ actionType, items });
  }
}
