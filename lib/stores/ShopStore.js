"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Events        from "events";

const { EventEmitter } = Events;

var shop = null;

class ShopStore extends EventEmitter {
  get() {
    return shop;
  }
};

ApiDispatcher.register((action) => {
  switch(action.actionType) {
    case Constants.Shop.SET_CURRENT:
      shop = action.shop;
      break;
    default:
      // no-op
  }
});

module.exports = new ShopStore();
