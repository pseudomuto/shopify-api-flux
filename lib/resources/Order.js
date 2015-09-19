"use strict";

import Base from "./Base";

/**
 * The Order resource
 *
 * @extends {Base}
 */
class Order extends Base {
  constructor() {
    super("order", {
      countable:    true,
      createable:   true,
      destroyable:  true
    });
  }
}

/** @ignore */
export default new Order();
