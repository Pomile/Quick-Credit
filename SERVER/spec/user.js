import chai from 'chai';
import request from 'supertest';
import app from '../server';
import userData from './data/user';

const expect = chai.expect;

describe('QUICK-CREDIT Test Suite', () => {
  describe('User API', () => {
    it('A user should be able to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1Data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.id).to.equal(1);
          expect(res.body.data.isAdmin).to.equal(false);
          done();
        });
    });

    it('The admin user should be able to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user2Data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.id).to.equal(2);
          expect(res.body.data.isAdmin).to.equal(true);
          done();
        });
    });

    it('A user should not be able to create an existing account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1Data)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('user already exists');
          done();
        });
    });

    it('A user should not be able to create an account without firstname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithoutFirstname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Firstname is required');
          done();
        });
    });

    it('A user should not be able to create an account without lastname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithoutLastname)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Lastname is required');
          done();
        });
    });

    it('A user should not be able to create an account with invalid email', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithInvalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Valid Email is required');
          done();
        });
    });

    it('A user should not be able to create an account if the length of a password is below 5', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithInvalidPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid password');
          done();
        });
    });

    
    it('A user should not be able to create an account if password does not match', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithPasswordMismatch)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Password mismatch');
          done();
        });
    });
    it('The admin user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user2Cred)
        .end((err, res) => {
          userData.adminUser.token = res.body.data.token;
          userData.adminUser.isAuth = res.body.data.isAuth;
          expect(res.body.data.id).to.equal(2);
          done();
        });
    });

    it('A user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1Cred)
        .end((err, res) => {
          userData.userAuth.token = res.body.token;
          userData.userAuth.isAuth = res.body.isAuth;
          expect(res.body.data.id).to.equal(1);
          done();
        });
    });

    it('A user should not be able to sign in with incorrect password ', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithIncorrectPassword)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Incorrect password');
          done();
        });
    });
    it('A user should not be able to sign in with invalid email', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithInvalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });
  });
});