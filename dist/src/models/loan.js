"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var loan = "\nid serial NOT NULL,\nclient text NOT NULL UNIQUE,\ncreateOn timestamptz NOT NULL DEFAULT NOW(),\namount numeric NOT NULL,\ntenor int NOT NULL,\nstatus character varying NOT NULL DEFAULT 'pending',\nrepaid boolean NOT NULL DEFAULT false,\ninterest numeric NOT NULL,\nmonthlyInstallment numeric NOT NULL,\nbalance numeric NOT NULL,\ndueDate date NOT NULL,\n\nCONSTRAINT \"Loans_pkey\" PRIMARY KEY (id),\nCONSTRAINT \"Loans_client_fkey\" FOREIGN KEY (client)\nREFERENCES Users (email)\nON UPDATE CASCADE\nON DELETE NO ACTION\n";
var _default = loan;
exports["default"] = _default;