"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getItem = _interopRequireDefault(require("./getItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var findUserById = function findUserById(list, email, propName) {
  return (0, _getItem["default"])(list, email, propName);
};

var _default = findUserById;
exports["default"] = _default;