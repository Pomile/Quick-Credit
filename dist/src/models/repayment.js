"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var repayment = "\nid serial NOT NULL,\nloanId int NOT NULL,\ncollector text NOT NULL,\ncreateOn timestamptz NOT NULL DEFAULT NOW(),\namount numeric NOT NULL,\nbalance numeric NOT NULL,\n\nCONSTRAINT \"Repayments_pkey\" PRIMARY KEY (id),\nCONSTRAINT \"Repayments_collector_fkey\" FOREIGN KEY (collector)\nREFERENCES Users (email)\nON UPDATE CASCADE\nON DELETE NO ACTION,\nCONSTRAINT \"Repayments_loanId_fkey\" FOREIGN KEY (loanId)\nREFERENCES Loans (id)\nON UPDATE CASCADE\nON DELETE NO ACTION\n";
var _default = repayment;
exports["default"] = _default;