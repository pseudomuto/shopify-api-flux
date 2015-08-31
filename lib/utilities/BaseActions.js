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
}
