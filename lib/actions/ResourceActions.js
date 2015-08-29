"use strict";

import Api           from "../utilities/WebAPI";
import ApiDispatcher from "../dispatcher/ApiDispatcher";
import Constants     from "../Constants";
import _             from "lodash";

export default class {
  constructor(resourceName) {
    this.resource           = resourceName;
    this.resourceCollection = `${resourceName}s`;
  }

  fetch(query) {
    let url      = this.urlFor(query);
    let dispatch = this._dispatchMerge.bind(this);
    let request  = Api.get(url);

    if (this._isSingleResourceQuery(query)) {
      let resource = this.resource;
      return request.then(response => dispatch([response[resource]]));
    }

    let resource = this.resourceCollection;
    return request.then(response => dispatch(response[resource]));
  }

  mergeAction() {
    return Constants.Data[`MERGE_${this.resourceCollection.toUpperCase()}`];
  }

  clearAction() {
    return Constants.Data[`CLEAR_${this.resourceCollection.toUpperCase()}`];
  }

  urlFor(query) {
    if (this._isSingleResourceQuery(query)) {
      let template = _.template(`/admin/${this.resourceCollection}/<%= id %>.json`);
      return template({ id: query });
    }

    let params = this._parameterize(query);
    let url    = `/admin/${this.resourceCollection}.json`;

    return params ? `${url}?${params}` : url;
  }

  _parameterize(obj) {
    if (!obj) {
      return "";
    }

    return Object.keys(obj).map((key) => {
      let value = obj[key];
      return `${key}=${encodeURIComponent(value)}`;
    }).join("&");
  }

  _isSingleResourceQuery(query) {
    return _.includes(["string", "number"], typeof(query));
  }

  _dispatchMerge(items) {
    var action = { actionType: this.mergeAction() };
    action[this.resourceCollection] = items;

    ApiDispatcher.dispatch(action);
  }
};
