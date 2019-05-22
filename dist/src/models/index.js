"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _pg = require("pg");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("./user"));

var _loan = _interopRequireDefault(require("./loan"));

var _repayment = _interopRequireDefault(require("./repayment"));

var _job = _interopRequireDefault(require("./job"));

var _address = _interopRequireDefault(require("./address"));

var _model = _interopRequireDefault(require("./model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var db = {};
var pool;

if (process.env.NODE_ENV === 'production') {
  pool = new _pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  });
} else if (process.env.NODE_ENV === 'development') {
  pool = new _pg.Pool({
    database: process.env.DEV_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  });
} else if (process.env.NODE_ENV === 'test') {
  pool = new _pg.Pool({
    database: process.env.TEST_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  });
}

var createTables =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return new _model["default"]('Users').createTable(_user["default"]);

          case 3:
            _context.next = 5;
            return new _model["default"]('Loans').createTable(_loan["default"]);

          case 5:
            _context.next = 7;
            return new _model["default"]('Addresses').createTable(_address["default"]);

          case 7:
            _context.next = 9;
            return new _model["default"]('Jobs').createTable(_job["default"]);

          case 9:
            _context.next = 11;
            return new _model["default"]('Repayments').createTable(_repayment["default"]);

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);

            _debug["default"].log(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 13]]);
  }));

  return function createTables() {
    return _ref.apply(this, arguments);
  };
}();

var dropTables =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return new _model["default"]('Addresses').dropTable();

          case 3:
            _context2.next = 5;
            return new _model["default"]('Jobs').dropTable();

          case 5:
            _context2.next = 7;
            return new _model["default"]('Repayments').dropTable();

          case 7:
            _context2.next = 9;
            return new _model["default"]('Loans').dropTable();

          case 9:
            _context2.next = 11;
            return new _model["default"]('Users').dropTable();

          case 11:
            _context2.next = 16;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);

            _debug["default"].log(_context2.t0.message);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));

  return function dropTables() {
    return _ref2.apply(this, arguments);
  };
}();

db.models = {
  sync: function () {
    var _sync = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(options) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(options.force === false)) {
                _context3.next = 6;
                break;
              }

              _context3.next = 3;
              return createTables();

            case 3:
              _debug["default"].log('done');

              _context3.next = 11;
              break;

            case 6:
              _context3.next = 8;
              return dropTables();

            case 8:
              _context3.next = 10;
              return createTables();

            case 10:
              _debug["default"].log('done');

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function sync(_x) {
      return _sync.apply(this, arguments);
    }

    return sync;
  }()
};
db.pool = pool;
var _default = db;
exports["default"] = _default;