"use strict";

module.exports = jest.genMockFunction().mockReturnValue(new Promise((r, _) => r()));
