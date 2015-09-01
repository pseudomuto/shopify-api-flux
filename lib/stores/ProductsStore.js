"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import BaseStore     from "./BaseStore";

class ProductsStore extends BaseStore {
}

export default new ProductsStore(ApiDispatcher);
