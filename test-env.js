window.fetch = require("whatwg-fetch");
console.warn = jest.genMockFunction();

window.stubFetchRequest = (api, json) => {
  api.get.mockReturnValue(new Promise((resolve, _) => resolve(json)));
};
