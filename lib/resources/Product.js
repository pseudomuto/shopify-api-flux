"use strict";

import Base from "./Base";

/**
 * The Product resource
 *
 * @extends {Base}
 */
class Product extends Base {
  constructor() {
    super("product", {
      countable: true,
      createable: true
    });
  }
}

/** @ignore */
export default new Product();
