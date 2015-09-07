"use strict";

import Flux from "flux/utils";
import _    from "lodash";

function mergeItems(state, items) {
  let initialState = state.set(items[0].id, items[0]);

  return items.reduce((previous, current) => {
    return previous.set(current.id, current);
  }, initialState);
}

export default class extends Flux.MapStore {
  constructor(dispatcher, mergeAction, clearAction) {
    super(dispatcher);
    this._mergeAction = mergeAction;
    this._clearAction = clearAction;
  }

  where(source) {
    return _.where(this.getState().toArray(), source);
  }

  reduce(state, action) {
    switch(action.actionType) {
      case this._mergeAction:
        return mergeItems(state, action.items);
      case this._clearAction:
        return state.clear();
      default:
        return state;
    }
  }

  areEqual(state1, state2) {
    return _.isEqual(state1, state2);
  }
}
