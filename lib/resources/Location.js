"use strict";

import Base from "./Base";

/**
 * The Location resource
 *
 * @extends {Base}
 */
class Location extends Base {
  constructor() {
    super("location", {
      countable:    false,
      createable:   false,
      destroyable:  false
    });
  }
}

/** @ignore */
export default new Location();
