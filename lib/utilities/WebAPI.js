"use strict";

import Constants       from "../Constants";
import SessionStore    from "../stores/SessionStore";
import ShopifyAPIError from "../ShopifyAPIError";

/**
 * A method signature for resolved request promises
 *
 * @typedef {Function} SuccessfulRequestCallback
 * @param {object} json
 *
 * @example
 * import WebAPI from "./WebAPI";
 *
 * WebAPI.get("/some/path").then(json => {
 *   // do something with the result
 *   console.log(json);
 * });
 */

/**
 * A method signature for rejected request promises
 *
 * @typedef {Function} FailedRequestCallback
 * @param {Error} error
 *
 * @example
 * import WebAPI from "./WebAPI";
 *
 * WebAPI.get("/failed/request").catch(error => {
 *   // do something with the error
 *   console.log(error.message);
 * });
 */

/**
 * A {@link Promise} that resolves with a {@link SuccessfulRequestCallback} and rejects with a {@link FailedRequestCallback}
 *
 * @typedef {Promise} RequestPromise
 */

function _performRequest(method, url, options) {
  options                                 = (options || {});
  options.method                          = method;
  options.headers                         = (options.headers || {});
  options.headers["Accept"]               = "application/json";
  options.headers["Content-Type"]         = "application/json";
  options.headers["User-Agent"]           = "Shopify API Flux";
  options.headers[Constants.OAUTH_HEADER] = SessionStore.getAccessToken();

  return fetch(`https://${SessionStore.getDomain()}${url}`, options).then(response => {
    if (!response.ok) {
      throw new ShopifyAPIError(response);
    }

    return response.json();
  });
}

/**
 * A helper class for working with the REST API.
 *
 * In all cases, no attempt is made to trap errors. {@link RequestPromise}s are returned from each method. It's up to the
 * caller to handle rejection.
 *
 * @example
 * import WebAPI from "./WebAPI";
 *
 * WebAPI.get("/admin/products.json")
 *   .then(json => console.log(json))
 *   .catch(error => console.log(error.message));
 */
class WebAPI {
  /**
   * Performs a GET request for the given URL and options
   *
   * @param {string} url - the (relative) URL to get (e.g. `/admin/products.json`)
   * @param {object} [options] - options to pass along to the fetch call
   *
   * @return {RequestPromise}
   */
  get(url, options) {
    return _performRequest("get", url, options);
  }

  /**
   * Performs a POST request for the given URL and options, passing the resource as the request body
   *
   * @param {string} url - the (relative) URL to get (e.g. `/admin/products.json`)
   * @param {object} [resource] - the resource to post as the request body
   * @param {object} [options] - options to pass along to the fetch call
   *
   * @return {RequestPromise}
   */
  post(url, resource, options) {
    if (resource) {
      options      = (options || {});
      options.body = JSON.stringify(resource);
    }

    return _performRequest("post", url, options);
  }

  /**
   * Performs a PUT request for the given URL and options, passing the resource as the request body
   *
   * @param {string} url - the (relative) URL to get (e.g. `/admin/products/1.json`)
   * @param {object} [resource] - the resource to post as the request body
   * @param {object} [options] - options to pass along to the fetch call
   *
   * @return {RequestPromise}
   */
  put(url, resource, options) {
    if (resource) {
      options      = (options || {});
      options.body = JSON.stringify(resource);
    }

    return _performRequest("put", url, options);
  }

  /**
   * Performs a DELETE request for the given URL and options
   *
   * @param {string} url - the (relative) URL to get (e.g. `/admin/products/1.json`)
   * @param {object} [options] - options to pass along to the fetch call
   *
   * @return {RequestPromise}
   */
  delete(url, options) {
    return _performRequest("delete", url, options);
  }
}

/** @ignore */
export default new WebAPI();
