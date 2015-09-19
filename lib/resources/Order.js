"use strict";

import Api  from "../utilities/WebAPI";
import Base from "./Base";

/**
 * The Order resource
 *
 * @extends {Base}
 */
class Order extends Base {
  constructor() {
    super("order", {
      countable:    true,
      createable:   true,
      destroyable:  true
    });
  }

  /**
   * Close an open order
   *
   * @param {number|string} - The id of the order
   *
   * @return {RequestPromise}
   */
  close(id) {
    return this._postToAction(id, "close");
  }

  /**
   * Open a closed order
   *
   * @param {number|string} - The id of the order
   *
   * @return {RequestPromise}
   */
  open(id) {
    return this._postToAction(id, "open");
  }

  /**
   * Cancel an order
   *
   * @param {number|string} - The id of the order
   * @param {object}  [options] - Options for the cancel operation
   * @param {number}  [options.amount] - The (decimal) amount to refund
   * @param {boolean} [options.restock=false] - Whether or not to restock inventory
   * @param {string}  [options.reason=other] - One of customer, inventory, fraud or other
   * @param {boolean} [options.email=false] - Whether or not to send the customer an email regarding the cancellation
   *
   * @return {RequestPromise}
   */
  cancel(id, options = {}) {
    return this._postToAction(id, "cancel", options);
  }

  _postToAction(id, action, resource) {
    let url      = this._memberURLForAction(action, id);
    let dispatch = this._dispatchMerge.bind(this);
    let property = this._resource;

    return Api.post(url, resource).then(response => dispatch(response[property]));
  }

  _memberURLForAction(action, ...urlParams) {
    return this.urlFor(...urlParams).replace(/\.json$/, `/${action}.json`);
  }
}

/** @ignore */
export default new Order();
