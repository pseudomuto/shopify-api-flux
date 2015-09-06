"use strict";

import BaseActions from "../utilities/BaseActions";
import _           from "lodash";

class OrderActions extends BaseActions {
  constructor() {
    super("order");
  }

  static get actionMethods() {
    return _.union(super.actionMethods, ["fetchAuthorized", "fetchAllSince"]);
  }

  fetchAuthorized() {
    return this.fetch({ financial_status: "authorized" });
  }

  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

export default new OrderActions();
