"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var job = "\nid serial NOT NULL,\nuserId int UNIQUE NOT NULL,\nmonthlyIncome Numeric NULL,\ngrossIncome Numeric NULL,\nyears int NULL,\nposition character varying NOT NULL,\ncompanyName text NOT NULL,\ncompanySector character varying NOT NULL,\nofficeAddress character varying NOT NULL,\nstate character varying NOT NULL,\n\nCONSTRAINT \"Jobs_pkey\" PRIMARY KEY (id),\nCONSTRAINT \"Jobs_userId_fkey\" FOREIGN KEY (userId)\nREFERENCES Users (id)\nON UPDATE CASCADE\nON DELETE NO ACTION\n";
var _default = job;
exports["default"] = _default;