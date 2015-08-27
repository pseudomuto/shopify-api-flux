"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";

class InvalidTokenException {
  constructor(message) {
    this.name    = "InvalidTokenException";
    this.message = message;
  }
}

class AuthActions {
  setAuthToken(token) {
    if (!token) {
      throw new InvalidTokenException("Token cannot be blank, null, undefined or empty");
    }

    ApiDispatcher.dispatch({
      actionType: Constants.Auth.SET_AUTH_TOKEN,
      accessToken: token
    });
  }
}

module.exports = new AuthActions();
