"use strict";

import Flux from "flux";

const { Dispatcher } = Flux;

/**
 * A generic action object that is dispatched by {APIDispatcher}
 *
 * @typedef {object} Action
 * @property {string} actionType - The type of action to be dispatched
 */

/**
 * An action object that is dispatched when items should be added to a store
 *
 * @typedef {object} MergeAction
 * @property {string} actionType - The type of action to be dispatched
 * @property {Array<object>} items - An array of items to be added to the store
 */

export default new Dispatcher();
