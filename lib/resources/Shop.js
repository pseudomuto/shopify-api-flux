"use strict";

import Base      from "./Base";
import Constants from "../Constants";

class Shop extends Base {
  constructor() {
    super("shop");

    this._resources   = this._resource;
    this._mergeAction = Constants.Actions.SET_SHOP;
    this._clearAction = Constants.Actions.CLEAR_SHOP;
  }
}

export default new Shop();
