"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";

export default class {
  constructor(resourceName) {
    this._resource     = resourceName;
    this._resources    = `${resourceName}s`;
    this._mergeAction  = Constants.Actions[`MERGE_${this._resources.toUpperCase()}`];
    this._clearAction  = Constants.Actions[`CLEAR_${this._resources.toUpperCase()}`];
  }

  static get actionMethods() {
    return ["clear"];
  }

  clear() {
    ApiDispatcher.dispatch({
      actionType: this._clearAction
    });
  }

  urlFor(query) {
    switch (typeof(query)) {
      case "number":
      case "string":
        return `/admin/${this._resources}/${query}.json`;
      default:
        let url    = `/admin/${this._resources}.json`;
        let params = this._parameterize(query);
        return params ? `${url}?${params}` : url;
    }
  }

  _parameterize(obj) {
    if (!obj) {
      return "";
    }

    return Object.keys(obj).map((key) => {
      let value = obj[key];
      return `${key}=${encodeURIComponent(value)}`;
    }).join("&");
  }
}
