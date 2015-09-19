"use strict";

import Base from "./Base";

/**
 * The Webhook resource
 *
 * @extends {Base}
 */
class Webhook extends Base {
  constructor() {
    super("webhook", {
      countable: true,
      createable: true,
      destroyable: true
    });
  }
}

/** @ignore */
export default new Webhook();
