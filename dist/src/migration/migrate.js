"use strict";

var _debug = _interopRequireDefault(require("debug"));

var _index = _interopRequireDefault(require("../models/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var models = _index["default"].models;

_debug["default"].log('Database migration in progress....\n\n');

models.sync({
  force: true
});