"use strict";

import ResourceActions from "./ResourceActions";

class ProductActions extends ResourceActions {
  constructor() {
    super("product");
  }

  fetchByCollection(collectionId) {
    return this.fetch({ collection_id: collectionId });
  }

  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

module.exports = new ProductActions();
