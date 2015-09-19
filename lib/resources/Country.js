"use strict";

import Base from "./Base";

/**
 * The Country resource
 *
 * @extends {Base}
 */
class Country extends Base {
  constructor() {
    super("country", {
      countable: true,
      createable: true,
      destroyable: true
    });

    this._resources = "countries";
  }
}

/** @ignore */
export default new Country();
