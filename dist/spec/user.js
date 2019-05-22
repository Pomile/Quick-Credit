"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

var _user = _interopRequireDefault(require("./data/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
describe('QUICK-CREDIT Test Suite', function () {
  describe('User API', function () {
    it('should allow a user to create an account', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1Data).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.data.id).to.equal(5);
        expect(res.body.data.isadmin).to.equal(false);
        done();
      });
    });
    it('Should allow an admin user should be able to create an account', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user2Data).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.data.id).to.equal(6);
        expect(res.body.data.isadmin).to.equal(true);
        done();
      });
    });
    it('should not allow a user to create an existing account', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1Data).end(function (err, res) {
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('user already exists');
        done();
      });
    });
    it('should not allow a user to create an account without firstname property', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1DataWithNoFirstnameField).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('firstname is required');
        done();
      });
    });
    it('should not allow a user to create an account without firstname', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1DataWithoutFirstname).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Firstname is required');
        done();
      });
    });
    it('should not allow a user to create an account without lastname', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1DataWithoutLastname).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Lastname is required');
        done();
      });
    });
    it('should not allow a user to create an account without invalid email', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1DataWithInvalidEmail).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Email is required');
        done();
      });
    });
    it('should not allow a user to create an account if the length of a password is below 5', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1DataWithInvalidPassword).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid password');
        done();
      });
    });
    it('should not allow a user to create an account if password does not match', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signup').set('Accept', 'application/json').send(_user["default"].user1DataWithPasswordMismatch).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Password mismatch');
        done();
      });
    });
    it('should allow an admin user to sign in', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user2Cred).end(function (err, res) {
        _user["default"].adminAuth.token = res.body.data.token;
        expect(res.status).to.equal(200);
        expect(res.body.data.id).to.equal(6);
        expect(res.body.msg).to.equal('user logged in successfully');
        done();
      });
    });
    it('should allow a user to sign in', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user1Cred).end(function (err, res) {
        _user["default"].userAuth.token = res.body.data.token;
        _user["default"].userAuth.isAuth = res.body.isAuth;
        expect(res.status).to.equal(200);
        expect(res.body.data.id).to.equal(5);
        expect(res.body.msg).to.equal('user logged in successfully');
        done();
      });
    });
    it('should not allow a user to sign in with incorrect password ', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user1CredWithIncorectPassword).end(function (err, res) {
        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal('Incorrect password');
        done();
      });
    });
    it('should not allow a user to sign in with invalid email', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user1CredWithoutEmail).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Email is required');
        done();
      });
    });
    it('should not allow a user to sign in with invalid password', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user1CredWithInvalidPassword).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid password');
        done();
      });
    });
    it('should not  allow a user to sign if email is not registered', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user1CredWithInvalidEmail).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('user not found');
        done();
      });
    });
    it('should not allow a user to sign in without email property', function (done) {
      (0, _supertest["default"])(_server["default"]).post('/api/v1/auth/signin').set('Accept', 'application/json').send(_user["default"].user1CredWithNoEmailField).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('email is required');
        done();
      });
    });
    it('should allow a user to add user home address', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/address').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1Address).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.data.userid).to.equal(5);
        expect(res.body.data.homeaddress).to.equal('234, Gerard rd, Ikoyi');
        done();
      });
    });
    it('should not allow a user to add more than one user home address', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/address').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1Address).end(function (err, res) {
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('user address already exists');
        done();
      });
    });
    it('should not allow a user to add user home address without address property', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/address').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1homeAddressWithoutAddressProp).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('address is required');
        done();
      });
    });
    it('should not allow a user to  add user home address without address', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/address').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1homeAddressWithoutAddress).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Address is required');
        done();
      });
    });
    it('should not allow a user to  add user home address without state', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/address').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1homeAddressWithoutState).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('State is required');
        done();
      });
    });
    it('should not allow a user to add user home address with invalid user id parameter', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/erereeer/address').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1homeAddressWithoutState).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid id. id must be an integer');
        done();
      });
    });
    it('should not allow a user to add user home address with invalid token', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/address').set('Accept', 'application/json').set({
        authorization: "".concat(token, "yturr")
      }).send(_user["default"].user1homeAddressWithoutState).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
    });
    it('should allow a user to  add job details', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/5/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1Job).end(function (err, res) {
        expect(res.status).to.equal(201);
        expect(res.body.data.id).to.equal(1);
        expect(res.body.data.officeaddress).to.equal('345, Alexander rd, Ikoyi');
        expect(res.body.data.state).to.equal('Lagos');
        done();
      });
    });
    it('should not allow a user to add more than one job details', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1Job2).end(function (err, res) {
        expect(res.status).to.equal(409);
        expect(res.body.error).to.equal('user job detail already exist');
        done();
      });
    });
    it('should not allow a user to add job details without office address', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1JobWithoutOfficeAddress).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Office address is required');
        done();
      });
    });
    it('should not allow a user to add job details without office address property', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1JobWithoutOfficeAddressProp).end(function (err, res) {
        expect(res.status).to.equal(400);
        expect(res.body.error).to.equal('officeAddress is required');
        done();
      });
    });
    it('should not allow a user to  add job details without state', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1JobWithoutState).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('State is required');
        done();
      });
    });
    it('should not allow a user to  add job details without company name', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1JobWithoutCompanyName).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Company name is required');
        done();
      });
    });
    it('should not allow a user to  add job details without Position', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1JobWithoutPosition).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Job position is required');
        done();
      });
    });
    it('should not allow a user to add job details without monthly income', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1JobWithoutMonthlyIncome).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Monthly income is required');
        done();
      });
    });
    it('should not allow a user to add user job details with invalid user id parameter', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/erereeer/job').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send(_user["default"].user1Job).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid id. id must be an integer');
        done();
      });
    });
    it('should not allow a user to add user job details with invalid token', function (done) {
      var token = _user["default"].userAuth.token;
      (0, _supertest["default"])(_server["default"]).post('/api/v1/users/1/job').set('Accept', 'application/json').set({
        authorization: "".concat(token, "yturr")
      }).send(_user["default"].user1Job).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid token');
        done();
      });
    });
    it('should allow an admin user to verify a user', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/users/kyle.jackson@yahoo.com/verify').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'verified'
      }).end(function (err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.data.email).to.equal('kyle.jackson@yahoo.com');
        expect(res.body.data.status).to.equal('verified');
        done();
      });
    });
    it('should not allow an admin user to verify a user that does not exist', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/users/johnny.wilson@yahoo.com/verify').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'verified'
      }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('user not found');
        done();
      });
    });
    it('should not allow an admin user to verify a user with invalid email', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/users/phil.collins@gmail/verify').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'verified'
      }).end(function (err, res) {
        expect(res.status).to.equal(422);
        expect(res.body.error).to.equal('Invalid email');
        done();
      });
    });
    it('should not allow an admin user to verify a user with email that is not registered', function (done) {
      var token = _user["default"].adminAuth.token;
      (0, _supertest["default"])(_server["default"]).patch('/api/v1/users/phil.collins@gmail.com/verify').set('Accept', 'application/json').set({
        authorization: "".concat(token)
      }).send({
        status: 'verified'
      }).end(function (err, res) {
        expect(res.status).to.equal(404);
        expect(res.body.error).to.equal('user not found');
        done();
      });
    });
  });
});