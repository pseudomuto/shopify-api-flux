"use strict";

import ResourceActions from "../actions/ResourceActions";
import _               from "lodash";

const METHOD_BLACKLIST = [
  /^constructor$/,
  /^mergeAction$/,
  /^clearAction$/,
  /^urlFor$/,
  /^_/
];

function inMethodBlacklist(fn) {
  return _.any(METHOD_BLACKLIST, pattern => {
    return fn.match(pattern);
  });
}

function functionsToProxy(actions) {
  return _.filter(Object.getOwnPropertyNames(actions.__proto__), fn => {
    return typeof(actions[fn]) === "function" && !inMethodBlacklist(fn);
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
      value: (...args) => {
        return actions[method].call(actions, ...args);
      }
    });
  });

  return wrapper;
}
