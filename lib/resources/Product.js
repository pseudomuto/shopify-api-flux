"use strict";

import Base from "./Base";

class Product extends Base {
  constructor() {
    super("product");
  }

  static get actionMethods() {
    return super.actionMethods.concat(["fetchByCollection", "fetchAllSince"]);
  }

  fetchByCollection(collectionId) {
    return this.fetch({ collection_id: collectionId });
  }

  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

export default new Product();
