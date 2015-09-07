"use strict";

jest.dontMock("../../dispatcher/APIDispatcher");
jest.dontMock("flux/utils");
jest.dontMock("../ShopStore");

import Constants from "../../Constants";

describe("ShopStore", () => {
  var store, dispatcher, changeEvent;

  beforeEach(() => {
    store      = require("../ShopStore");
    dispatcher = store.getDispatcher();

    changeEvent = jest.genMockFunction();
    store.__emitter.emit = changeEvent;
  });

  it("initially has a null shop", () => {
    expect(store.getCurrent()).toBeNull();
  });

  it("sets the shop when the action is dispatched and emits the change event", () => {
    dispatcher.dispatch({
      actionType: Constants.Actions.SET_SHOP,
      items: ["myshop"]
    });

    expect(store.getCurrent()).toBe("myshop");
    expect(changeEvent.mock.calls.length).toBe(1);
  });

  it("clears the shop when the action is dispatched and emits the change event", () => {
    dispatcher.dispatch({
      actionType: Constants.Actions.SET_SHOP,
      items: ["myshop"]
    });

    dispatcher.dispatch({ actionType: Constants.Actions.CLEAR_SHOP });
    expect(store.getCurrent()).toBeNull();
    expect(changeEvent.mock.calls.length).toBe(2);
  });
});
