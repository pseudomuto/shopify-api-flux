"use strict";

import ApiDispatcher from "../dispatcher/ApiDispatcher";
import BaseStore from "./BaseStore";

module.exports = new BaseStore(ApiDispatcher);
