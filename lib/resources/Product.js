"use strict";

import Base from "./Base";

class Product extends Base {
  constructor() {
    super("product");
  }

  static get apiMethods() {
    return super.apiMethods.concat(["fetchByCollection", "fetchAllSince"]);
  }

  fetchByCollection(collectionId) {
    return this.fetch({ collection_id: collectionId });
  }

  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

export default new Product();
