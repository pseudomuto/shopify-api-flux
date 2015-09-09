"use strict";

import Constants from "../Constants";

function constantFor(prefix, suffix) {
  return Constants.Actions[`${prefix}_${suffix}`];
}

export default class {
  /**
   * Creates a new action object for the specified resource
   *
   * @param {string} resourceName - The name of the resource (plural - e.g. `products`)
   */
  constructor(resourceName) {
    this._actionSuffix = resourceName.toUpperCase();
  }

  get mergeAction() {
    return constantFor("MERGE", this._actionSuffix);
  }

  get clearAction() {
    return constantFor("CLEAR", this._actionSuffix);
  }

  get countAction() {
    return constantFor("COUNT", this._actionSuffix);
  }
}
