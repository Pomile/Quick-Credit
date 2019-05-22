"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

var _user = _interopRequireDefault(require("./data/user"));

var _loan = _interopRequireDefault(require("./data/loan"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('QUICK-CREDIT Test Suite', function () {
  describe('Loan API', function () {
    it('A user should be able to apply for a loan', function (done) {
      var _userData$userAuth = _user["default"].userAuth,
          token = _userData$userAuth.token,
          isAuth = _userData$userAuth.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_loan["default"].user1creditRequest).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.data.client).to.equal('kyle.jackson@yahoo.com');
        expect(res.body.data.amount).to.equal(200000);
        expect(res.body.data.interest).to.equal(10000);
        done();
      });
    });
    it('A user should not be able to apply for a loan without amount', function (done) {
      var _userData$userAuth2 = _user["default"].userAuth,
          token = _userData$userAuth2.token,
          isAuth = _userData$userAuth2.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_loan["default"].user1creditRequestWithoutAmount).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Loan amount is required');
        done();
      });
    });
    it('A user should not be able to apply for a loan without amount property', function (done) {
      var _userData$userAuth3 = _user["default"].userAuth,
          token = _userData$userAuth3.token,
          isAuth = _userData$userAuth3.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_loan["default"].user1creditRequestWithoutAmountProp).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('amount is required');
        done();
      });
    });
    it('A user should not be able to apply for a loan without tenor', function (done) {
      var _userData$userAuth4 = _user["default"].userAuth,
          token = _userData$userAuth4.token,
          isAuth = _userData$userAuth4.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_loan["default"].user1creditRequestWithoutTenor).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Tenor is required');
        done();
      });
    });
    it('A user should not be able to apply for a loan if previous loan is not repaid', function (done) {
      var _userData$userAuth5 = _user["default"].userAuth,
          token = _userData$userAuth5.token,
          isAuth = _userData$userAuth5.isAuth;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token),
        isAuth: "".concat(isAuth)
      }).send(_loan["default"].user1creditRequest).end(function (err, res) {
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('Previous loan not repaid');
        done();
      });
    });
    it('An admin user should be able to approve a loan', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/loans/5').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'approved'
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.data.status).to.equal('approved');
        expect(res.body.data.client).to.equal('kyle.jackson@yahoo.com');
        expect(parseFloat(res.body.data.amount)).to.equal(200000);
        done();
      });
    });
    it('An admin user should be able to recject a loan', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/loans/3').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'rejected'
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.data.status).to.equal('rejected');
        done();
      });
    });
    it('An admin user should not be able to approve a loan with invalid id', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/loans/gshghsgh').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'rejected'
      }).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid id. id must be an integer');
        done();
      });
    });
    it('An admin user should not be able to approve a loan with unknown id', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/loans/50').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'rejected'
      }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('loan not found');
        done();
      });
    });
    it('An admin user should not be able to approve a loan without status property', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/loans/5').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({}).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('status is required');
        done();
      });
    });
    it('An admin user should not be able to approve a loan with invalid status', function (done) {
      var _userData$adminAuth = _user["default"].adminAuth,
          token = _userData$adminAuth.token,
          isAuth = _userData$adminAuth.isAuth;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/loans/5').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'njsjhsjhjs'
      }).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Loan status is required');
        done();
      });
    });
    it('An admin user should be able to get all loans', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        var loan = res.body.data.find(function (userLoan) {
          return userLoan.id === 5;
        });
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.equal(5);
        expect(loan.client).to.equal('kyle.jackson@yahoo.com');
        done();
      });
    });
    it('A user should not be able to get all loans', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        expect(res.status).to.equal(403);
        expect(res.body.error).to.equal('access denied');
        done();
      });
    });
    it('An admin user should be able to get all loans with pending approval', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans?status=pending&repaid=false').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        var userLoan = res.body.data.find(function (loan) {
          return loan.client === 'john.wilson@yahoo.com';
        });
        expect(res.status).to.equal(200);
        expect(userLoan.repaid).to.equal(false);
        expect(userLoan.status).to.equal('pending');
        expect(userLoan.client).to.equal('john.wilson@yahoo.com');
        expect(res.body.data.length).to.equal(3);
        done();
      });
    });
    it('An admin user should be able to get all loans that are not fully repaid', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans?status=approved&repaid=false&').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.data[0].status).to.equal('approved');
        expect(res.body.data[0].repaid).to.equal(false);
        expect(res.body.data[0].client).to.equal('kyle.jackson@yahoo.com');
        expect(parseFloat(res.body.data[0].balance)).to.gt(0);
        done();
      });
    });
    it('An admin user should be able to get all repaid loans', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans?status=approved&repaid=true').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.data.length).to.equal(0);
        done();
      });
    });
    it('An admin user should be able to get a specfic loan', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans/5').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.data.repaid).to.equal(false);
        expect(res.body.data.status).to.equal('approved');
        expect(res.body.data.client).to.equal('kyle.jackson@yahoo.com');
        expect(parseFloat(res.body.data.amount)).to.equal(200000);
        done();
      });
    });
    it('An admin user should not be able to get a specfic loan with id that does not exist', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).get('/api/v1/loans/50').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('loan not found');
        done();
      });
    });
  });
});