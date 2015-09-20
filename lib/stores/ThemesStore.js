"use strict";

import Actions       from "../utilities/Actions";
import APIDispatcher from "../dispatcher/APIDispatcher";
import BaseStore     from "./BaseStore";

/**
 * The themes store
 *
 * @extends {BaseStore}
 */
class ThemesStore extends BaseStore {
  /**
   * Sets the the dispatcher and appropriate actions for themes
   *
   * @param {APIDispatcher} dispatcher - The dispatcher to register with
   */
  constructor(dispatcher) {
    super(dispatcher, new Actions("themes"));
  }
}

/** @ignore */
export default new ThemesStore(APIDispatcher);
