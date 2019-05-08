"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var findLoanByEmail = function findLoanByEmail(list, email) {
  var data;
  var exist = false;
  var len = list.length;

  if (len > 0) {
    list.forEach(function (item) {
      if (item.user === email) {
        data = item;
        exist = true;
      }
    });
  }

  return {
    exist: exist,
    data: data
  };
};

var _default = findLoanByEmail;
exports["default"] = _default;