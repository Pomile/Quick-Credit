"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

var _user = _interopRequireDefault(require("./data/user"));

var _repayment = _interopRequireDefault(require("./data/repayment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('QUICK-CREDIT Test Suite', function () {
  describe('Repayment API', function () {
    it('An admin user should be able to make payment', function (done) {
      var _userData$adminAuth = _user["default"].adminAuth,
          token = _userData$adminAuth.token,
          isAuth = _userData$adminAuth.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/5/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2Post1).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(201);
        expect(res.body.data.amount).to.equal(42000);
        expect(res.body.data.collector).to.equal('adeniyi.jone@gmail.com');
        expect(res.body.data.balance).to.equal(168000);
        done();
      });
    });
    it('An admin user should not be able to make payment if a loan is fully repaid', function (done) {
      var _userData$adminAuth2 = _user["default"].adminAuth,
          token = _userData$adminAuth2.token,
          isAuth = _userData$adminAuth2.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/1/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2Post2).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('Repayment error.Loan repayment is balanced');
        done();
      });
    });
    it('An admin user should not be able to make payment if a loan id does not exist', function (done) {
      var _userData$adminAuth3 = _user["default"].adminAuth,
          token = _userData$adminAuth3.token,
          isAuth = _userData$adminAuth3.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/50/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2Post2).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('loan not found');
        done();
      });
    });
    it('An admin user should not be able to make payment if a loan is not approved', function (done) {
      var _userData$adminAuth4 = _user["default"].adminAuth,
          token = _userData$adminAuth4.token,
          isAuth = _userData$adminAuth4.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/4/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2Post2).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('Loan is not approved');
        done();
      });
    });
    it('An admin user should not be able to make payment with invalid id', function (done) {
      var _userData$adminAuth5 = _user["default"].adminAuth,
          token = _userData$adminAuth5.token,
          isAuth = _userData$adminAuth5.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/gyyuuy/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2Post1).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid id. id must be an integer');
        done();
      });
    });
    it('An admin user should not be able to make payment without amount', function (done) {
      var _userData$adminAuth6 = _user["default"].adminAuth,
          token = _userData$adminAuth6.token,
          isAuth = _userData$adminAuth6.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/5/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2PostWithoutAmount).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Amount is required');
        done();
      });
    });
    it('An admin user should not be able to make payment without amount property', function (done) {
      var _userData$adminAuth7 = _user["default"].adminAuth,
          token = _userData$adminAuth7.token,
          isAuth = _userData$adminAuth7.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/5/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_repayment["default"].user2PostWithoutAmountProp).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('amount is required');
        done();
      });
    });
    it('An admin user should not be able to make payment if isauth is false or undefined', function (done) {
      var _userData$adminAuth8 = _user["default"].adminAuth,
          token = _userData$adminAuth8.token,
          isAuth = _userData$adminAuth8.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans/5/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_repayment["default"].user2Post1).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Not authorized');
        done();
      });
    });
    it('A user should be able to view a specific loan repayment history', function (done) {
      var _userData$userAuth = _user["default"].userAuth,
          token = _userData$userAuth.token,
          isAuth = _userData$userAuth.isAuth;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans/5/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(200);
        expect(res.body.data[0].collector).to.equal('adeniyi.jone@gmail.com');
        expect(res.body.data);
        done();
      });
    });
    it('A user should not be able to view a specific loan repayment history of another user', function (done) {
      var _userData$userAuth2 = _user["default"].userAuth,
          token = _userData$userAuth2.token,
          isAuth = _userData$userAuth2.isAuth;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans/4/repayment').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).end(function (err, res) {
        // console.log(res.body);
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('access denied');
        done();
      });
    });
  });
});