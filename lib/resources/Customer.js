"use strict";

import Api  from "../utilities/WebAPI";
import Base from "./Base";

/**
 * The Customer resource
 *
 * @extends {Base}
 */
class Customer extends Base {
  constructor() {
    super("customer", {
      countable:    true,
      createable:   true,
      destroyable:  true
    });
  }

  /**
   * @override
   */
  get apiMethods() {
    return super.apiMethods.concat(["search"]);
  }

  /**
   * Searches for customers
   *
   * @param {ResourceQuery} query - Query parameters
   * @param {string} query.query - What to search for (e.g.`Bob country:United States`)
   * @param {string} [query.order] - Field and direction (default `last_order_date DESC`)
   * @param {string} [query.fields] - Comma-delimeted set of fields to include in results
   *
   * @return {RequestPromise}
   */
  search(query) {
    let url      = this.urlFor("search", query);
    let dispatch = this._dispatchMerge.bind(this);
    let property = this._resources;

    return Api.get(url).then(response => dispatch(response[property]));
  }
}

/** @ignore */
export default new Customer();
