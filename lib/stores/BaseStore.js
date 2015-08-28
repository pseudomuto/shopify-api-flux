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

class BaseStore extends Flux.MapStore {
  reduce(state, action) {
    switch(action.actionType) {
      case Constants.Store.MERGE:
        return mergeItems(state, action.items);
      case Constants.Store.CLEAR:
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
