"use strict";

import Base from "./Base";

/**
 * The Redirect resource
 *
 * @extends {Base}
 */
class Redirect extends Base {
  constructor() {
    super("redirect", {
      countable: true,
      createable: true,
      destroyable: true
    });
  }
}

/** @ignore */
export default new Redirect();
