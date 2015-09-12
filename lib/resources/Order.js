"use strict";

import Base from "./Base";

/**
 * The Order resource
 *
 * @extends {Base}
 */
class Order extends Base {
  constructor() {
    super("order", {
      countable: true
    });
  }

  /**
   * @override
   * An array of methods to be exposed via {@link APIProxy}
   *
   * @return {Array<string>} The names of all methods to be made available
   */
  get apiMethods() {
    return super.apiMethods.concat(["fetchAuthorized", "fetchAllSince"]);
  }

  /**
   * Fetch authorized orders from the API
   *
   * @return {RequestPromise}
   */
  fetchAuthorized() {
    return this.fetch({ financial_status: "authorized" });
  }

  /**
   * Fetch all orders that were created after the specified order
   *
   * @param {number|string} id - The id of the reference order
   *
   * @return {RequestPromise}
   */
  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

/** @ignore */
export default new Order();
