"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var calulateMonthlyInstall = function calulateMonthlyInstall(amount, interest, tenor) {
  return (amount + interest) / tenor;
};

var _default = calulateMonthlyInstall;
exports["default"] = _default;