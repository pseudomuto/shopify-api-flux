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

export default class extends Flux.MapStore {
  where(source) {
    return _.where(this.getState().toArray(), source);
  }

  mergeAction() {
    return Constants.Actions[`MERGE_${this._actionResourceName()}`];
  }

  clearAction() {
    return Constants.Actions[`CLEAR_${this._actionResourceName()}`];
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

  _actionResourceName() {
    return this.constructor.name.replace(/Store$/, "").toUpperCase();
  }
}
