"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var domain      = null;
var accessToken = null;

const { Store } = Flux;

class SessionStore extends Store {
  getDomain() {
    return domain;
  }

  getAccessToken() {
    return accessToken;
  }

  __onDispatch(action) {
    switch(action.actionType) {
      case Constants.Actions.SET_SESSION:
        domain      = action.domain;
        accessToken = action.accessToken;
        this.__emitChange();
        break;
      default:
        // no-op
    }
  }
}

export default new SessionStore(ApiDispatcher);
