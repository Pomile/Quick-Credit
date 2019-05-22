"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var address = "\nid serial NOT NULL,\nuserId int UNIQUE NOT NULL,\nhomeAddress character varying NOT NULL,\nstate character varying NOT NULL,\n\nCONSTRAINT \"Addresses_pkey\" PRIMARY KEY (id),\nCONSTRAINT \"Addresses_userId_fkey\" FOREIGN KEY (userId)\nREFERENCES Users (id)\nON UPDATE CASCADE\nON DELETE NO ACTION\n";
var _default = address;
exports["default"] = _default;