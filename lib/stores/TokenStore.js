"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var accessToken = null;

const { Store } = Flux;

class TokenStore extends Store {
  getAccessToken() {
    return accessToken;
  }

  __onDispatch(action) {
    switch(action.actionType) {
      case Constants.Auth.SET_AUTH_TOKEN:
        accessToken = action.accessToken;
        this.__emitChange();
        break;
      default:
        // no-op
    }
  }
};

module.exports = new TokenStore(ApiDispatcher);
