"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getItem = _interopRequireDefault(require("./getItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var findUser = function findUser(users, email, propName) {
  return (0, _getItem["default"])(users, email, propName);
};

var _default = findUser;
exports["default"] = _default;