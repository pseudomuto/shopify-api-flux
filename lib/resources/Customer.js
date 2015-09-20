"use strict";

import Base from "./Base";

/**
 * The Customer resource
 *
 * @extends {Base}
 */
class Customer extends Base {
  constructor() {
    super("customer", {
      countable:    true,
      createable:   true,
      destroyable:  true
    });
  }
}

/** @ignore */
export default new Customer();
