"use strict";

import assign from "object-assign";

export default class {
  constructor(actions, store) {
    this.__actions     = actions;
    this.__store       = store;

    assign(this, this.__actions);
  }

  get store() {
    return this.__store;
  }
}
