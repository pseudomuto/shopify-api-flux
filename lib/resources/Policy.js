"use strict";

import Base from "./Base";

/**
 * The Policy resource
 *
 * @extends {Base}
 */
class Policy extends Base {
  constructor() {
    super("policy", {
      countable:    false,
      createable:   false,
      destroyable:  false
    });

    this._resources = "policies";
  }

  /**
   * @override
   */
  urlFor() {
    return `/admin/${this._resources}.json`;
  }
}

/** @ignore */
export default new Policy();
