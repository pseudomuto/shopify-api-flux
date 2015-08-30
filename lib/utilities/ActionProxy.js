"use strict";

import _ from "lodash";

const REJECTED_PROPS = ["constructor", "mergeAction", "clearAction"];

function delegate(dest) {
  _.reject(Object.keys(dest), prop => _.includes(REJECTED_PROPS, prop)).forEach(prop => {
    this[prop] = (...args) => {
      return dest[prop](...args);
    };
  });
}

export default class {
  constructor(actions, store) {
    this.__actions     = actions;
    this.__store       = store;

    delegate.call(this, this.__actions);
  }

  get store() {
    return this.__store;
  }
}
