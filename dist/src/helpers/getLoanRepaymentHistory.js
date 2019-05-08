"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _getItemsById = _interopRequireDefault(require("./getItemsById"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getRepaymentHistory = function getRepaymentHistory(list, id, type) {
  return (0, _getItemsById["default"])(list, id, type);
};

var _default = getRepaymentHistory;
exports["default"] = _default;