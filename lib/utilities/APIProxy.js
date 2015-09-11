"use strict";

export default function(actions, store) {
  let wrapper = Object.create({}, {
    store: {
      get: () => store
    }
  });

  actions.apiMethods.forEach(method => {
    Object.defineProperty(wrapper, method, {
      value: (...args) => {
        return actions[method].call(actions, ...args);
      }
    });
  });

  return wrapper;
}
