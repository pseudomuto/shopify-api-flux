"use strict";

jest.dontMock("../Base");
jest.dontMock("../Order");
jest.dontMock("../../utilities/URLHelpers");

import Constants from "../../Constants";

const Base = require("../Base");

describe("Order", () => {
  let orders = [{ id: 1, name: "Order #1" }];

  var resource, api, dispatcher;

  beforeEach(() => {
    dispatcher = require("../../dispatcher/APIDispatcher");
    resource   = require("../Order");
    api        = require("../../utilities/WebAPI");
  });

  describe("#apiMethods", () => {
    it("exposes base and specific fetch methods", () => {
      let actual   = resource.apiMethods;
      let expected = new Base("order").apiMethods.concat(["fetchAuthorized", "fetchAllSince"]);

      expect(actual).toEqual(expected);
    });
  });

  describe("#fetchAuthorized", () => {
    var request;

    beforeEach(() => {
      stubFetchRequest(api, { orders });
      request = resource.fetchAuthorized();
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
      request = resource.fetchAllSince(12345);
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
