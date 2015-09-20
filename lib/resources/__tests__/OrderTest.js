"use strict";

jest.dontMock("../Base");
jest.dontMock("../Order");
jest.dontMock("../../utilities/URLHelpers");

import Constants from "../../Constants";

describe("Order", () => {
  var resource;

  beforeEach(() => {
    resource = require("../Order");
  });

  it("is countable", () => {
    expect(resource.apiMethods).toContain("fetchCount");
  });

  it("is createable", () => {
    expect(resource.apiMethods).toContain("create");
    expect(resource.apiMethods).toContain("update");
  });

  it("is destroyable", () => {
    expect(resource.apiMethods).toContain("destroy");
  });

  it("exports custom methods", () => {
    expect(resource.apiMethods).toContain("open");
    expect(resource.apiMethods).toContain("close");
    expect(resource.apiMethods).toContain("cancel");
  });

  describe("#custom actions", () => {
    let actionType = Constants.Actions.MERGE_ORDERS;
    let order      = { id: 1, name: "Order #1" };

    var api, request, dispatcher;

    beforeEach(() => {
      api        = require("../../utilities/WebAPI");
      dispatcher = require("../../dispatcher/APIDispatcher");

      stubRequest(api, "post", { order });
    });

    describe("#open", () => {
      beforeEach(() => {
        request = resource.open(order.id);
      });

      it("posts to the correct endpoint", () => {
        expect(api.post).toBeCalledWith(`/admin/orders/${order.id}/open.json`, undefined);
      });

      pit("dispatches the merge action on success", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: [order] });
        });
      });
    });

    describe("#close", () => {
      beforeEach(() => {
        request = resource.close(order.id);
      });

      it("posts to the correct endpoint", () => {
        expect(api.post).toBeCalledWith(`/admin/orders/${order.id}/close.json`, undefined);
      });

      pit("dispatches the merge action on success", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: [order] });
        });
      });
    });

    describe("#cancel", () => {
      beforeEach(() => {
        request = resource.cancel(order.id);
      });

      it("posts to the correct endpoint", () => {
        expect(api.post).toBeCalledWith(`/admin/orders/${order.id}/cancel.json`, {});
      });

      it("includes options when supplied", () => {
        let options = { email: true };
        request     = resource.cancel(order.id, options);

        expect(api.post).toBeCalledWith(`/admin/orders/${order.id}/cancel.json`, options);
      });

      pit("dispatches the merge action on success", () => {
        return Promise.resolve(request).then(() => {
          expect(dispatcher.dispatch).toBeCalledWith({ actionType, items: [order] });
        });
      });
    });
  });
});
