"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import WebAPI        from "../utilities/WebAPI";

function notifyDispatcher(response) {
  ApiDispatcher.dispatch({
    actionType: Constants.Shop.SET_CURRENT,
    shop: response.json().shop
  });
}

class ShopActions {
  fetch() {
    return WebAPI.get(Constants.Urls.SHOP).then(response => notifyDispatcher(response));
  }
}

module.exports = new ShopActions();
