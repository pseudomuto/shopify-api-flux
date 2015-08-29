"use strict";

import Api           from "../utilities/WebAPI";
import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import _             from "lodash";

const FETCH_URL     = _.template("/admin/products/<%= id %>.json");
const FETCH_ALL_URL = "/admin/products.json";

function addToStore(products) {
  ApiDispatcher.dispatch({
    actionType: Constants.Data.MERGE_PRODUCTS,
    products: products
  });
}

function paramify(obj) {
  if (!obj) {
    return "";
  }

  return Object.keys(obj).map((key) => {
    let value = obj[key];
    return `${key}=${encodeURIComponent(value)}`;
  }).join("&");
}

class ProductActions {
  fetch(query) {
    if (_.includes(["string", "number"], typeof(query))) {
      return Api.get(FETCH_URL({ id: query })).then(response => addToStore([response.product]));
    }

    var url    = FETCH_ALL_URL;
    var params = paramify(query);
    if (params) {
      url = `${url}?${params}`;
    }

    return Api.get(url).then(response => addToStore(response.products));
  }
}

module.exports = new ProductActions();
