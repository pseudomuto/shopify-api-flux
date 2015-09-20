"use strict";

import Base from "./Base";

/**
 * The Theme resource
 *
 * @extends {Base}
 */
class Theme extends Base {
  constructor() {
    super("theme", {
      countable:    false,
      createable:   true,
      destroyable:  true
    });
  }
}

/** @ignore */
export default new Theme();
