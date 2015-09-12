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

  /**
   * @override
   * An array of methods to be exposed via {@link APIProxy}
   *
   * @return {Array<string>} The names of all methods to be made available
   */
  get apiMethods() {
    return super.apiMethods.concat(["fetchByCollection", "fetchAllSince"]);
  }

  /**
   * Fetch products in the specified collection
   *
   * @param {number|string} collectionId - The id of the collection
   *
   * @return {RequestPromise}
   */
  fetchByCollection(collectionId) {
    return this.fetch({ collection_id: collectionId });
  }

  /**
   * Fetch all products created after the specified product
   *
   * @param {number|string} id - The id of the reference product
   *
   * @return {RequestPromise}
   */
  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

/** @ignore */
export default new Product();
