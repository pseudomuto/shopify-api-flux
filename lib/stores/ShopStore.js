"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var shop = null;

const { Store } = Flux;

/**
 * The shop store
 *
 * @extends {Store}
 */
class ShopStore extends Store {
  /**
   * Gets the current shop based on the domain and accessToken registered with the session
   *
   * @return {object} The shop resource
   */
  getCurrent() {
    return shop;
  }

  __onDispatch(action) {
    switch(action.actionType) {
      case Constants.Actions.SET_SHOP:
        shop = action.items[0];
        this.__emitChange();
        break;
      case Constants.Actions.CLEAR_SHOP:
        shop = null;
        this.__emitChange();
        break;
      default:
        // no-op
        break;
    }
  }
}

/** @ignore */
export default new ShopStore(APIDispatcher);
