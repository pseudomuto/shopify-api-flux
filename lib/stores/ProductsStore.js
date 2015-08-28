"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import Flux          from "flux/utils";
import _             from "lodash";

function addProducts(state, products) {
  let initialState = state.set(products[0].id, products[0]);

  return products.reduce((previous, current) => {
    return previous.set(current.id, current)
  }, initialState);
}

class ProductsStore extends Flux.MapStore {
  reduce(state, action) {
    switch(action.actionType) {
      case Constants.Product.ADD_PRODUCTS:
        return addProducts(state, action.products);
      case Constants.Product.CLEAR:
        return state.clear();
      default:
        return state;
    }
  }

  areEqual(state1, state2) {
    return _.isEqual(state1, state2);
  }
}

module.exports = new ProductsStore(ApiDispatcher);
