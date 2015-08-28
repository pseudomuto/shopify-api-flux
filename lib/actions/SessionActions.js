"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";

class InvalidShopNameException {
  constructor(message) {
    this.name    = "InvalidShopNameException";
    this.message = message;
  }
}

class InvalidTokenException {
  constructor(message) {
    this.name    = "InvalidTokenException";
    this.message = message;
  }
}

function verifyDomain(domain) {
  if(!domain) {
    throw new InvalidDomainException("Domain name cannot be blank or null");
  }
}

function verifyToken(token) {
  if (!token) {
    throw new InvalidTokenException("Token cannot be blank, null, undefined or empty");
  }
}

function sanitizeDomain(domain) {
  if (!domain.match(/myshopify\.com$/)) {
    return `${domain}.myshopify.com`;
  }

  return domain;
}

class SessionActions {
  init(domain, token) {
    verifyDomain(domain);
    verifyToken(token);

    ApiDispatcher.dispatch({
      actionType: Constants.Session.SET_DOMAIN_AND_TOKEN,
      domain: sanitizeDomain(domain),
      accessToken: token
    });
  }
}

module.exports = new SessionActions();
