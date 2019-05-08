"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getNotRepaidLoans = function getNotRepaidLoans(loans) {
  var notFullyRepaidLoans = [];
  loans.forEach(function (loan) {
    if (loan.status === 'approved' && loan.repaid === false) {
      notFullyRepaidLoans.push(loan);
    }
  });
  return notFullyRepaidLoans;
};

var _default = getNotRepaidLoans;
exports["default"] = _default;