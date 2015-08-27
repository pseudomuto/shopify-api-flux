"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Events        from "events";

const { EventEmitter } = Events;

var accessToken = null;

class TokenStore extends EventEmitter {
  getAccessToken() {
    return accessToken;
  }
};

ApiDispatcher.register((action) => {
  switch(action.actionType) {
    case Constants.Auth.SET_AUTH_TOKEN:
      accessToken = action.accessToken;
      break;
    default:
      // no-op
  }
});

module.exports = new TokenStore();
