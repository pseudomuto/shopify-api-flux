window.fetch = require("whatwg-fetch");
console.warn = jest.genMockFunction();

window.stubRequest = (api, method, json) => {
  api[method].mockReturnValue(new Promise((resolve, _) => resolve(json)));
};
