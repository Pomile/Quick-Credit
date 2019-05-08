"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var findDueDate = function findDueDate(noOfMonths) {
  var date = new Date();
  var newDate = new Date(date.setMonth(date.getMonth() + noOfMonths));
  return newDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    time: 'numeric'
  });
};

var _default = findDueDate;
exports["default"] = _default;