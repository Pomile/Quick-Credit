"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getPendingLoans = function getPendingLoans(loans) {
  var approvedLoans = [];
  loans.forEach(function (loan) {
    if (loan.status === 'pending') {
      approvedLoans.push(loan);
    }
  });
  return approvedLoans;
};

var _default = getPendingLoans;
exports["default"] = _default;