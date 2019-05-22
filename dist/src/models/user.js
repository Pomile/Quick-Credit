"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var user = "\n      id serial NOT NULL,\n      firstname character varying NOT NULL,\n      lastname character varying NOT NULL,\n      email text UNIQUE NOT NULL,\n      image bytea NULL,\n      password text NOT NULL,\n      phone character varying NOT NULL,\n      status character varying NOT NULL DEFAULT 'pending',\n      isadmin boolean NOT NULL DEFAULT 'f',\n      \n      CONSTRAINT \"Users_pkey\" PRIMARY KEY (id)\n";
var _default = user;
exports["default"] = _default;