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

  /**
   * The name of the class of this error
   *
   * @return {string}
   */
  get name() {
    return this.constructor.name;
  }

  /**
   * The status code returned from the response
   *
   * @return {number}
   */
  get status() {
    return this._status;
  }

  /**
   * The message for this error (including status code and text)
   *
   * @return {string}
   */
  get message() {
    return this._message;
  }
}
