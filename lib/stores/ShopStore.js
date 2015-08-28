"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var shop = null;

const { Store } = Flux;

class ShopStore extends Store {
  get() {
    return shop;
  }

  __onDispatch(action) {
    switch(action.actionType) {
      case Constants.Shop.SET_CURRENT:
        shop = action.shop;
        this.__emitChange();
        break;
      default:
        // no-op
    }
  }
};

module.exports = new ShopStore(ApiDispatcher);
