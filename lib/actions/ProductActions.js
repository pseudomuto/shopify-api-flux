"use strict";

import BaseActions from "../utilities/BaseActions";
import _           from "lodash";

class ProductActions extends BaseActions {
  constructor() {
    super("product");
  }

  static get actionMethods() {
    return _.union(super.actionMethods, ["fetchByCollection", "fetchAllSince"]);
  }

  fetchByCollection(collectionId) {
    return this.fetch({ collection_id: collectionId });
  }

  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

module.exports = new ProductActions();
