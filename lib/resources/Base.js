"use strict";

import Actions       from "../utilities/Actions";
import Api           from "../utilities/WebAPI";
import APIDispatcher from "../dispatcher/APIDispatcher";
import URLHelpers    from "../utilities/URLHelpers";

function isPrimitive(value) {
  return ["number", "string"].indexOf(typeof value) >= 0;
}

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
   * which will be used to infer the merge, count, and clear actions to be dispatched.
   *
   * @param {string} resourceName - The singular name for the resource (e.g. `product`)
   * @param {boolean} [countable=false] - Whether or not this resource is countable (has a /count.json endpoint)
   */
  constructor(resourceName, countable = false) {
    this._resource  = resourceName;
    this._resources = `${resourceName}s`;
    this._countable = countable;
  }

  /**
   * An array of methods to be exposed via {@link APIProxy}
   *
   * @return {Array<string>} The names of all methods to be made available
   */
  get apiMethods() {
    let methods = ["clear", "fetch"];

    if (this._countable) {
      methods.push("fetchCount");
    }

    return methods;
  }

  /**
   * Returns an object that supplies the clear, count and merge actions for this resource
   *
   * @return {Actions}
   */
  get actions() {
    return new Actions(this._resources);
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
   * Performs a GET request for the resource's count endpoint
   *
   * @param {ResourceQuery} [query]
   *
   * @return {RequestPromise}
   */
  fetchCount(query) {
    let url      = this.urlFor("count", query);
    let dispatch = this._dispatchCount.bind(this);

    return Api.get(url).then(response => dispatch(response.count, query));
  }

  /**
   * Performs a POST request, sending the resource along as the request body
   *
   * @param {object} resource - The resource to be created
   * @param {object} [options] - Options to be passed along to the request
   */
  create(resource, options) {
    let url      = this.urlFor();
    let dispatch = this._dispatchMerge.bind(this);
    let property = this._resource;

    return Api.post(url, resource, options).then(response => dispatch(response[property]));
  }

  /**
   * Dispatches the clear action for this resource. The action will be handled by the appropriate store.
   */
  clear() {
    APIDispatcher.dispatch({ actionType: this.actions.clearAction });
  }

  /**
   * @protected
   * Generates a resource URL for the specified query. The query can be an id, or an object to be converted to a query
   * string.
   *
   * @param {ResourceQuery} [query]
   * @param {ResourceQuery} [params] - Query string parameters (only used when query is a number or string)
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
   * instance.urlFor(1, { type: "test" })          // `/admin/products/1.json?type=test
   * instance.urlFor({ fields: ["id", "title"] }); // `/admin/products.json?fields=id,title
   */
  urlFor(query, params) {
    var url         = `/admin/${this._resources}.json`;
    var queryString = URLHelpers.toQueryString(query);

    if (isPrimitive(query)) {
      url         = `/admin/${this._resources}/${query}.json`;
      queryString = URLHelpers.toQueryString(params);
    }

    return queryString ? `${url}?${queryString}` : url;
  }

  _dispatchMerge(items) {
    if (!Array.isArray(items)) {
      items = [items];
    }

    let actionType = this.actions.mergeAction;
    APIDispatcher.dispatch({ actionType, items });
  }

  _dispatchCount(count, query) {
    let actionType = this.actions.countAction;
    APIDispatcher.dispatch({ actionType, count, query });
  }
}
