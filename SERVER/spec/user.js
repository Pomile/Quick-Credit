import chai from 'chai';
import nock from 'nock';
import fs from 'fs';
import request from 'supertest';
import app from '../server';
import userData from './data/user';

const { expect } = chai;

describe('QUICK-CREDIT Test Suite', () => {
  describe('User API', () => {
    it('should allow a user to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1Data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.id).to.equal(7);
          expect(res.body.data.isadmin).to.equal(false);
          done();
        });
    });
    it('Should allow an admin user should be able to create an account', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user2Data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.id).to.equal(8);
          expect(res.body.data.isadmin).to.equal(false);
          done();
        });
    });


    it('should not allow a user to create an existing account', (done) => {
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

    it('should not allow a user to create an account without firstname property', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithNoFirstnameField)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('firstname is required');
          done();
        });
    });

    it('should not allow a user to create an account without firstname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithoutFirstname)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Firstname is required');
          done();
        });
    });

    it('should not allow a user to create an account without lastname', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithoutLastname)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Lastname is required');
          done();
        });
    });

    it('should not allow a user to create an account with invalid email', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithInvalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Check your email address');
          done();
        });
    });

    it('should not allow a user to create an account if the length of a password is below 5', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithInvalidPassword)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Invalid password');
          done();
        });
    });

    it('should not allow a user to create an account if password does not match', (done) => {
      request(app)
        .post('/api/v1/auth/signup')
        .set('Accept', 'application/json')
        .send(userData.user1DataWithPasswordMismatch)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Password mismatch');
          done();
        });
    });
    it('should allow an admin user to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send({ email: 'admin@gmail.com', password: 'kingslanding1' })
        .end((err, res) => {
          userData.adminAuth.token = res.body.data.token;
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(6);
          expect(res.body.msg).to.equal('user logged in successfully');
          done();
        });
    });

    it('should allow a user to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1Cred)
        .end((err, res) => {
          userData.userAuth.token = res.body.data.token;
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(7);
          expect(res.body.msg).to.equal('user logged in successfully');
          done();
        });
    });


    it('should not allow a user to sign in with incorrect password ', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithIncorectPassword)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Incorrect email or password');
          done();
        });
    });
    it('should not allow a user to sign in with invalid email', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithoutEmail)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Email is required');
          done();
        });
    });
    it('should not allow a user to sign in with invalid password', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithInvalidPassword)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Invalid password');
          done();
        });
    });
    it('should not  allow a user to sign if email is not registered', (done) => {
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
    it('should not allow a user to sign in without email property', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user1CredWithNoEmailField)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('email is required');
          done();
        });
    });
    it('should allow a user to add user home address', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Address)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.userid).to.equal(7);
          expect(res.body.data.homeaddress).to.equal('234, Gerard rd, Ikoyi');
          done();
        });
    });
    it('should not allow a user to add user home address without payload', (done) => {
      request(app)
        .post('/api/v1/users/7/address')
        .set('Accept', 'application/json')
        .set({ authorization: '' })
        .send(userData.user1Address)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.error).to.equal('Not authorized');
          done();
        });
    });
    it('should not allow a user to add more than one user home address', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Address)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('user address already exists');
          done();
        });
    });
    it('should not allow a user that does not exist to add address', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/50/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Address)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });
    it('should not allow a user to add user home address without address property', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1homeAddressWithoutAddressProp)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('address is required');
          done();
        });
    });
    it('should not allow a user to  add user home address without address', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1homeAddressWithoutAddress)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Address is required');
          done();
        });
    });
    it('should not allow a user to  add user home address without state', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1homeAddressWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('State is required');
          done();
        });
    });
    it('should not allow a user to add user home address with invalid user id parameter', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/erereeer/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1homeAddressWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid id. id must be a positive integer and greater than 0.');
          done();
        });
    });
    it('should not allow a user to add user home address with invalid token', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/6/address')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}yturr` })
        .send(userData.user1homeAddressWithoutState)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid token');
          done();
        });
    });
    it('should allow a user to  add job details', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.id).to.equal(1);
          expect(res.body.data.companywebsite).to.equal('www.godaddy.com');
          done();
        });
    });
    it('should not allow a user to add job details for another user', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/8/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');

          done();
        });
    });
    it('should not allow a user to add more than one job details', (done) => {
      userData.user1Job2.companyName = 'Ferdinado Intl';
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Job2)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.companyname).to.equal('Ferdinado Intl');
          done();
        });
    });


    it('should not allow a user to  add job details without company name', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1JobWithoutCompanyName)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Company name is required');
          done();
        });
    });
    it('should not allow a user to  add job details without Position', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1JobWithoutPosition)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Job position is required');
          done();
        });
    });
    it('should not allow a user to add job details without monthly income', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1JobWithoutMonthlyIncome)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Monthly income is required');
          done();
        });
    });
    it('should not allow a user to add user job details with invalid user id parameter', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/erereeer/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid id. id must be a positive integer and greater than 0.');
          done();
        });
    });
    it('should not allow a user to add user job details with invalid token', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/job')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}yturr` })
        .send(userData.user1Job)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid token');
          done();
        });
    });

    it('should allow a user to add user bank details', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/bank')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Bank)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.data.accnumber).to.equal('3071266098');
          done();
        });
    });
    it('should allow a user to add user bank details', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/10/bank')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Bank)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });
    it('should not allow a user to add user bank details that already exist', (done) => {
      const { token } = userData.userAuth;
      userData.user1Bank.name = 'Fidelity';
      request(app)
        .post('/api/v1/users/7/bank')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1Bank)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.name).to.equal('Fidelity');
          done();
        });
    });
    it('should not allow a user to add user bank details without bvn', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/bank')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1BankWithoutBvn)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('bvn is required');
          done();
        });
    });
    it('should allow a user to update his or her image', (done) => {
      const scope = nock('https://api.cloudinary.com/v1_1')
        .post('/pomile/image/upload')
        .reply(200, {
          public_id: 'sample',
          version: '1312461204',
          format: 'jpg',
          resource_type: 'image',
          url: 'http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
          secure_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
          signature: 'abcdefgc024acceb1c1baa8dca46717137fa5ae0c3',
          original_filename: 'sample',
        });
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/profile/image')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ authorization: `${token}` })
        .attach('file', `${__dirname}/data/48.jpg`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.image).to.equal('http://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg');
          done();
        });
    });
    it('should not allow a user to update his or her image with invalid file type', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/profile/image')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ authorization: `${token}` })
        .attach('file', `${__dirname}/data/48.txt`)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          done();
        });
    });
    it('should not allow a user to update his or her image if user does not exist', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/70/profile/image')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ authorization: `${token}` })
        .attach('file', `${__dirname}/data/48.jpg`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user does not exist');
          done();
        });
    });

    it('should not allow a user to update his or her image', (done) => {
      nock('https://api.cloudinary.com/v1_1')
        .post('/pomile/image/upload')
        .reply(404, {
          error: 'Whoops something went wrong',
        });
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/profile/image')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ authorization: `${token}` })
        .attach('file', `${__dirname}/data/48.jpg`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should allow a user to get profile', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .get('/api/v1/users/7/profile')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(7);
          done();
        });
    });
    it('should not allow a user that does not exist to get his or her profile', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .get('/api/v1/users/60/profile')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user does not exist');
          done();
        });
    });
    it('should not allow a user to add a user bank details with invalid account number', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .post('/api/v1/users/7/bank')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send(userData.user1BankWithInvalidAccNum)
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Bank acount number must be a number');
          done();
        });
    });
    it('should allow an admin user to assign admin role to a user', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/adeniyi.jone@gmail.com/role')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ isadmin: true })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(8);
          expect(res.body.data.isadmin).to.equal(true);
          done();
        });
    });

    it('should not allow an admin user to assign admin role to a user without isadmin', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/adeniyi.jone@gmail.com/role')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('isadmin is required');
          done();
        });
    });
    it('should not allow an admin user to assign admin role to a user with invalid value', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/adeniyi.jone@gmail.com/role')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ isadmin: 'kjhghs' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('kjhghs is not a valid value');
          done();
        });
    });
    it('should allow an admin user to verify a user', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/kyle.jackson@yahoo.com/verify')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'verified' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.email).to.equal('kyle.jackson@yahoo.com');
          expect(res.body.data.status).to.equal('verified');
          done();
        });
    });
    it('should not allow an admin user to verify a user with invalid status', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/kyle.jackson@yahoo.com/verify')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'verifiedxxx' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('verifiedxxx is not a valid user status');
          done();
        });
    });
    it('should not allow an admin user to verify a user without status', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/kyle.jackson@yahoo.com/verify')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('status is required');
          done();
        });
    });
    it('should not allow an admin user to verify a user that does not exist', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/johnny.wilson@yahoo.com/verify')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'verified' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });
    it('should not allow an admin user to verify a user with invalid email', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/phil.collins@gmail/verify')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'verified' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid email');
          done();
        });
    });
    it('should not allow an admin user to verify a user with email that is not registered', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/phil.collins@gmail.com/verify')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'verified' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });

    it('should allow a user to request for password reset', (done) => {
      request(app)
        .get('/api/v1/users/kyle.jackson@yahoo.com/forgot-password')
        .set('Accept', 'application/json')
        .end((err, res) => {
          const { token } = res.body.data;
          userData.userPassResetToken.token = token;
          expect(res.status).to.equal(200);
          expect(res.body.data.verified).to.equal(true);
          done();
        });
    });
    it('should not allow a user to request for password reset with account that does not exit', (done) => {
      request(app)
        .get('/api/v1/users/kyl.jackson@yahoo.com/forgot-password')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('user not found');
          done();
        });
    });

    it('should allow a user to reset password', (done) => {
      const { token } = userData.userPassResetToken;
      request(app)
        .patch('/api/v1/user/password-reset')
        .set({ authorization: `${token}` })
        .send({ password: 'queensPass1' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.msg).to.equal('password updated successfully');
          done();
        });
    });
    it('should not allow a user to reset password without a password', (done) => {
      const { token } = userData.userPassResetToken;
      request(app)
        .patch('/api/v1/user/password-reset')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('password is required');
          done();
        });
    });

    it('should not allow a user to reset password with empty password', (done) => {
      const { token } = userData.userPassResetToken;
      request(app)
        .patch('/api/v1/user/password-reset')
        .set({ authorization: `${token}` })
        .send({ password: '' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Password is empty');
          done();
        });
    });
  });
});
