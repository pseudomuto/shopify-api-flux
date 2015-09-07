"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var domain      = null;
var accessToken = null;

const { Store } = Flux;

class Sessions extends Store {
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

export default new Sessions(APIDispatcher);
