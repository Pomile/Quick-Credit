"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var getRepaidLoans = function getRepaidLoans(loans) {
  var fullyRepaidLoans = [];
  loans.forEach(function (loan) {
    if (loan.status === 'approved' && loan.repaid === true) {
      fullyRepaidLoans.push(loan);
    }
  });
  return fullyRepaidLoans;
};

var _default = getRepaidLoans;
exports["default"] = _default;