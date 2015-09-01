"use strict";

import Api           from "../utilities/WebAPI";
import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import URLHelpers    from "./URLHelpers";

function isPrimitive(value) {
  return ["number", "string"].indexOf(typeof value) >= 0;
}

export default class {
  constructor(resourceName) {
    this._resource     = resourceName;
    this._resources    = `${resourceName}s`;
    this._mergeAction  = Constants.Actions[`MERGE_${this._resources.toUpperCase()}`];
    this._clearAction  = Constants.Actions[`CLEAR_${this._resources.toUpperCase()}`];
  }

  static get actionMethods() {
    return ["clear", "fetch"];
  }

  fetch(query) {
    let url      = this.urlFor(query);
    let dispatch = this._dispatchMerge.bind(this);
    let resource = isPrimitive(query) ? this._resource : this._resources;

    return Api.get(url).then(response => dispatch(response[resource]));
  }

  clear() {
    ApiDispatcher.dispatch({ actionType: this._clearAction });
  }

  urlFor(query) {
    if (isPrimitive(query)) {
      return `/admin/${this._resources}/${query}.json`;
    }

    let url    = `/admin/${this._resources}.json`;
    let params = URLHelpers.toQueryString(query);
    return params ? `${url}?${params}` : url;
  }

  _dispatchMerge(items) {
    if (!Array.isArray(items)) {
      items = [items];
    }

    let actionType = this._mergeAction;
    ApiDispatcher.dispatch({ actionType, items });
  }
}
