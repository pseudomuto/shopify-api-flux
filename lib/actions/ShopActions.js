"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import WebAPI        from "../utilities/WebAPI";

const SHOP_URL = "/admin/shop.json";

function notifyDispatcher(response) {
  ApiDispatcher.dispatch({
    actionType: Constants.Actions.SET_SHOP,
    shop: response.shop
  });
}

class ShopActions {
  fetch() {
    return WebAPI.get(SHOP_URL).then(response => notifyDispatcher(response));
  }
}

module.exports = new ShopActions();
