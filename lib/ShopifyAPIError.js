"use strict";

function messageFromResponse(response) {
  return `API Error (${response.status}): ${response.statusText}`;
}

/**
 * A base error class for API errors
 *
 * @extends {Error}
 */
export default class ShopifyAPIError extends Error {
  constructor(response) {
    super(messageFromResponse(response));
    this._status  = response.status;
    this._message = messageFromResponse(response);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      Object.defineProperty(this, "stack", { value: (new Error()).stack });
    }
  }

  get name() {
    return this.constructor.name;
  }

  get status() {
    return this._status;
  }

  get message() {
    return this._message;
  }
}
