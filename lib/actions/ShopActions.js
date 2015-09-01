"use strict";

import BaseActions from "../utilities/BaseActions";
import Constants   from "../Constants";

class ShopActions extends BaseActions {
  constructor() {
    super("shop");

    this._resources   = this._resource;
    this._mergeAction = Constants.Actions.SET_SHOP;
    this._clearAction = Constants.Actions.CLEAR_SHOP;
  }
}

export default new ShopActions();
