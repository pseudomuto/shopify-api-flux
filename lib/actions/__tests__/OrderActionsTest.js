"use strict";

jest.dontMock("../../utilities/BaseActions");
jest.dontMock("../../utilities/URLHelpers");
jest.dontMock("../OrderActions");

import Constants from "../../Constants";

describe("OrderActions", () => {
  let orders = [{ id: 1, name: "Order #1" }];

  var actions, api, dispatcher;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/ApiDispatcher");
    actions    = require("../OrderActions");
    api        = require("../../utilities/WebAPI");
  });

  describe(".actionMethods", () => {
    it("exposes base and specific fetch methods", () => {
      let actual   = new Set(actions.constructor.actionMethods);
      let expected = new Set(["clear", "fetch", "fetchAuthorized", "fetchAllSince"]);
      expect(actual).toEqual(expected);
    });
  });

  describe("#fetchAuthorized", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { orders });
      request = actions.fetchAuthorized();
    });

    it("makes the request", () => {
      expect(api.get).toBeCalledWith("/admin/orders.json?financial_status=authorized");
    });

    pit("dispatches the merge event", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({
          actionType: Constants.Actions.MERGE_ORDERS,
          items: orders
        });
      });
    });
  });

  describe("#fetchAllSince", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { orders });
      request = actions.fetchAllSince(12345);
    });

    it("makes the request", () => {
      expect(api.get).toBeCalledWith("/admin/orders.json?since_id=12345");
    });

    pit("dispatches the merge event", () => {
      return Promise.resolve(request).then(() => {
        expect(dispatcher.dispatch).toBeCalledWith({
          actionType: Constants.Actions.MERGE_ORDERS,
          items: orders
        });
      });
    });
  });
});
