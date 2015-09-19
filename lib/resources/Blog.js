"use strict";

import Base from "./Base";

/**
 * The Blog resource
 *
 * @extends {Base}
 */
class Blog extends Base {
  constructor() {
    super("blog", {
      countable: true,
      createable: true,
      destroyable: true
    });
  }
}

/** @ignore */
export default new Blog();
