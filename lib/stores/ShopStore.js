"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var shop = null;

const { Store } = Flux;

class ShopStore extends Store {
  getCurrent() {
    return shop;
  }

  __onDispatch(action) {
    switch(action.actionType) {
      case Constants.Actions.SET_SHOP:
        shop = action.shop;
        this.__emitChange();
        break;
      case Constants.Actions.CLEAR_SHOP:
        shop = null;
        this.__emitChange();
        break;
      default:
        // no-op
    }
  }
};

module.exports = new ShopStore(ApiDispatcher);
