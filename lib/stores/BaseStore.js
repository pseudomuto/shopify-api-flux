"use strict";

import Constants     from "../Constants";
import Flux          from "flux/utils";
import _             from "lodash";

function mergeItems(state, items) {
  let initialState = state.set(items[0].id, items[0]);

  return items.reduce((previous, current) => {
    return previous.set(current.id, current);
  }, initialState);
}

class NotImplementedException {
  constructor(message) {
    this.name    = "NotImplementedException";
    this.message = message;
  }
}

class BaseStore extends Flux.MapStore {
  mergeAction() {
    throw new NotImplementedException("mergeAction() must be overridden in child classes");
  }

  clearAction() {
    throw new NotImplementedException("clearAction() must be overridden in child classes");
  }

  reduce(state, action) {
    switch(action.actionType) {
      case this.mergeAction():
        return mergeItems(state, action.items);
      case this.clearAction():
        return state.clear();
      default:
        return state;
    }
  }

  areEqual(state1, state2) {
    return _.isEqual(state1, state2);
  }
}

module.exports = BaseStore;
