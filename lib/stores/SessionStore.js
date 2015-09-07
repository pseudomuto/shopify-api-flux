"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";

var domain      = null;
var accessToken = null;

/** @ignore */
const { Store } = Flux;

/**
 * The session store
 *
 * This class doesn't inherit from the base store. Instead, it handles the `SET_SESSION` event. This event expects a
 * domain and accessToken property.
 */
class SessionStore extends Store {
  /**
   * Gets the domain for the session's shop
   *
   * @return {string}
   */
  getDomain() {
    return domain;
  }

  /**
   * Gets the API access token register for this session
   *
   * @return {string}
   */
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

/** @ignore */
export default new SessionStore(APIDispatcher);
