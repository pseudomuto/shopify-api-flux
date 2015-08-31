"use strict";

import ResourceActions from "../actions/ResourceActions";
import _               from "lodash";

const METHOD_BLACKLIST = [
  "constructor",
  "mergeAction",
  "clearAction"
];

function functionsToProxy(actions) {
  return _.filter(Object.getOwnPropertyNames(actions.__proto__), fn => {
    return typeof(actions[fn]) === "function" && !fn.match(/^_/) && !_.includes(METHOD_BLACKLIST, fn);
  });
}

export default function(actions, store) {
  var wrapper = Object.create({}, {
    store: {
      get: () => store
    }
  });

  let baseMethods = functionsToProxy(new ResourceActions());
  let methods     = functionsToProxy(actions);

  _.union(baseMethods, methods).forEach(method => {
    Object.defineProperty(wrapper, method, {
      value: () => actions[method].apply(actions, arguments)
    });
  });

  return wrapper;
}
