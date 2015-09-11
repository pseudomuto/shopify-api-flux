"use strict";

import Base      from "./Base";
import Constants from "../Constants";

/**
 * The Shop resource
 *
 * @extends {Base}
 */
class Shop extends Base {
  constructor() {
    super("shop");

    this._resources = this._resource;
  }

  /**
   * @override
   */
  get actions() {
    return {
      mergeAction: Constants.Actions.SET_SHOP,
      clearAction: Constants.Actions.CLEAR_SHOP
    };
  }
}

/** @ignore */
export default new Shop();
