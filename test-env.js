window.fetch = require("whatwg-fetch");
console.warn = jest.genMockFunction();

window.stubRequest = (api, method, json) => {
  api[method].mockReturnValue(new Promise((resolve, _) => resolve(json)));
};

window.setupIntegrationTest = (session) => {
  window.fetch = require("fetcher").fetch;

  require("node-env-file")(".env");

  beforeEach(() => {
    session.init(
      process.env.SHOPIFY_API_DOMAIN,
      process.env.SHOPIFY_API_TOKEN
    );
  });
};
