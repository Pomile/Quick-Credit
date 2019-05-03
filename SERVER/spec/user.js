import chai from 'chai';
import request from 'supertest';
import app from '../server';
import userData from './data/user';

const { expect } = chai;

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

    it('An admin user should be able to create an account', (done) => {
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
          expect(res.body.error).to.equal('Email is required');
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
    it('An admin user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user2Cred)
        .end((err, res) => {
          userData.adminAuth.token = res.body.data.token;
          userData.adminAuth.isAuth = res.body.isAuth;
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(2);
          expect(res.body.msg).to.equal('user logged in successfully');
          done();
        });
    });

    it('A user should be able to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1Cred)
        .end((err, res) => {
          userData.userAuth.token = res.body.data.token;
          userData.userAuth.isAuth = res.body.isAuth;
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(1);
          expect(res.body.msg).to.equal('user logged in successfully');
          done();
        });
    });

    it('A user should not be able to sign in with incorrect password ', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithIncorectPassword)
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
        .send(userData.user1CredWithoutEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Email is required');
          done();
        });
    });
    it('A user should not be able to sign in with invalid password', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithInvalidPassword)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid password');
          done();
        });
    });
    it('A user should not be able to sign if email is not registered', (done) => {
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
    it('A user should able to add user home address', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1Address)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.user).to.equal(1);
          expect(res.body.data.address).to.equal('234, Gerard rd, Ikoyi');
          done();
        });
    });
    it('A user should not able to add more than one user home address', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1Address)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('user address already exists');
          done();
        });
    });
    it('A user should not be able to add user home address without address', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1homeAddressWithoutAddress)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Address is required');
          done();
        });
    });
    it('A user should not be able to add user home address without state', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1homeAddressWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('State is required');
          done();
        });
    });
    it('A user should not be able to add user home address with invalid user id parameter', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/erereeer/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1homeAddressWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid user id. id must be an integer');
          done();
        });
    });
    it('A user should not be able to add user home address with invalid token', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}yturr`, isAuth: `${isAuth}` })
        .send(userData.user1homeAddressWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Invalid token');
          done();
        });
    });
<<<<<<< HEAD
=======

    it('A user should be able to add job details', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}yturr`, isAuth: `${isAuth}` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.id).to.equal(1);
          expect(res.body.data.officeAddress).to.equal('345, Alexander rd, Ikoyi');
          expect(res.body.data.state).to.equal('Lagos');
          done();
        });
    });
    it('A user should not be able to add more than one job details', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}yturr`, isAuth: `${isAuth}` })
        .send(userData.user1Job2)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('user job detail already exist');
          done();
        });
    });
    it('A user should not be able to add job details without office address', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1JobWithoutOfficeAddress)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Office Address is required');
          done();
        });
    });
    it('A user should not be able to add job details without state', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1JobWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('State is required');
          done();
        });
    });
    it('A user should not be able to add job details without company name', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1JobWithoutCompanyName)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Company name is required');
          done();
        });
    });
    it('A user should not be able to add job details without Position', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1JobWithoutPosition)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Job position is required');
          done();
        });
    });
    it('A user should not be able to add job details without monthly income', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1JobWithoutMonthlyIncome)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Monthly income is required');
          done();
        });
    });
    it('A user should not be able to add user job details with invalid user id parameter', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/erereeer/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid user id. id must be an integer');
          done();
        });
    });
    it('A user should not be able to add user job details with invalid token', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/users/1/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}yturr`, isAuth: `${isAuth}` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Invalid token');
          done();
        });
    });
>>>>>>> ch-user-jobDetails-test-165664038
  });
});
