"use strict";

import Base from "./Base";

/**
 * The Page resource
 *
 * @extends {Base}
 */
class Page extends Base {
  constructor() {
    super("page", {
      countable: true,
      createable: true,
      destroyable: true
    });
  }
}

/** @ignore */
export default new Page();
