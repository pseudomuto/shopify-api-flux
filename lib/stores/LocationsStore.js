"use strict";

import Actions       from "../utilities/Actions";
import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";

/**
 * The locations store
 *
 * @extends {BaseStore}
 */
class LocationsStore extends BaseStore {
  /**
   * Sets the the dispatcher and appropriate actions for locations
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("locations"));
  }
}

/** @ignore */
export default new LocationsStore(APIDispatcher);
