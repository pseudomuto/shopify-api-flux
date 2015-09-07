"use strict";

import APIDispatcher from "../dispatcher/APIDispatcher";
import Base          from "./Base";
import Constants     from "../Constants";

class InvalidDomainException extends Error {}
class InvalidTokenException extends Error {}

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

class Session extends Base {
  constructor() {
    super("session");

    this._resources   = this._resource;
    this._clearAction = Constants.Actions.CLEAR_SESSION;
  }

  static get apiMethods() {
    return ["init", "clear"];
  }

  init(domain, token) {
    verifyDomain(domain);
    verifyToken(token);

    APIDispatcher.dispatch({
      actionType: Constants.Actions.SET_SESSION,
      domain: sanitizeDomain(domain),
      accessToken: token
    });
  }
}

/** @ignore */
export default new Session();
