"use strict";

import Actions        from "../utilities/Actions";
import APIDispatcher  from "../dispatcher/APIDispatcher";
import CountableStore from "./CountableStore";

/**
 * The Countries store
 *
 * @extends {CountableStore}
 */
class CountriesStore extends CountableStore {
  /**
   * Sets the dispatcher and appropriate actions for countries
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("countries"));
  }
}

/** @ignore */
export default new CountriesStore(APIDispatcher);
