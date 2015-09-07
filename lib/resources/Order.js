"use strict";

import Base from "./Base";

class Order extends Base {
  constructor() {
    super("order");
  }

  static get apiMethods() {
    return super.apiMethods.concat(["fetchAuthorized", "fetchAllSince"]);
  }

  fetchAuthorized() {
    return this.fetch({ financial_status: "authorized" });
  }

  fetchAllSince(id) {
    return this.fetch({ since_id: id });
  }
}

export default new Order();
