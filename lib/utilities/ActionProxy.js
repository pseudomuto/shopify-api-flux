"use strict";

import _ from "lodash";

const REJECTED_PROPS = ["constructor", "mergeAction", "clearAction"];

function delegate(source, dest) {
  let props = _.reject(Object.keys(dest), prop => _.includes(REJECTED_PROPS, prop));
  props.forEach(prop => {
    source[prop] = (...args) => {
      return dest[prop](...args);
    }
  });
}

export default class {
  constructor(actions, store) {
    this.__actions     = actions;
    this.__store       = store;

    delegate(this, this.__actions);
  }

  get store() {
    return this.__store;
  }
}
