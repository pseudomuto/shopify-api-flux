"use strict";

import Flux from "flux/utils";
import _    from "lodash";

function mergeItems(state, items) {
  let initialState = state.set(items[0].id, items[0]);

  return items.reduce((previous, current) => {
    return previous.set(current.id, current);
  }, initialState);
}

/**
 * A base class for resource stores.
 *
 * Stores handle dispatch events from resources. When anything changes, the store's change event is omitted.
 *
 * This store exposes a few methods (from it's base class). These include:
 *
 * * `at(key)`  - returns the object with the specified key. Raises when not found
 * * `get(key)` - returns the object with the specified key. Returns undefined when not found
 * * `has(key)` - returns whether or not an object with the specified key exists in the store
 *
 * @extends {FluxMapStore}
 *
 * @example
 * import APIDispatcher from "../dispatcher/APIDispatcher";
 * import Base          from "./Base";
 *
 * let store = new Base(APIDispatcher, "MERGE_PRODUCTS", "CLEAR_PRODUCTS");
 *
 * // listen for change events
 * store.addListener(() => console.log(store.get(1)));
 *
 * // will cause the store to update the state and emit it's change event
 * APIDispatcher.dispatch({
 *   actionType: "MERGE_PRODUCTS",
 *   items: [{ id: 1, title: "My Product" }]
 * });
 */
export default class BaseStore extends Flux.MapStore {
  /**
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   * @param {Actions} actions
   */
  constructor(dispatcher, actions) {
    super(dispatcher);
    this._actions = actions;
  }

  /**
   * Queries the store for resources matching the source object
   *
   * @param {QueryObject} source
   *
   * @return {Array<object>} Resources that match the query
   */
  where(source) {
    return _.where(this.getState().toArray(), source);
  }

  /**
   * Used to reduce a stream of actions coming from the dispatcher into a
   * single state object. This will handle merge and clear actions for this resource.
   *
   * **This method should not be called directly**, but rather via a call to the dispatcher's `dispatch` method.
   *
   * @param {object} state - The current state
   * @param {object} action - The action sent by the dispatcher
   *
   * @return {object} The new state for this store
   */
  reduce(state, action) {
    switch(action.actionType) {
      case this._actions.mergeAction:
        return mergeItems(state, action.items);
      case this._actions.clearAction:
        return state.clear();
      default:
        return state;
    }
  }

  /**
   * Determines whether or not the state of this store has changed.
   *
   * **This method should not be called directly**
   *
   * @param {object} state1 - The original state
   * @param {object} state2 - The new state
   *
   * @return {boolean} Whether or not the state's are identical
   */
  areEqual(state1, state2) {
    return _.isEqual(state1, state2);
  }
}
