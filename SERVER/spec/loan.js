import chai from 'chai';
import request from 'supertest';
import app from '../server';
import userData from './data/user';
import loanData from './data/loan';

const { expect } = chai;

describe('QUICK-CREDIT Test Suite', () => {
  describe('Loan API', () => {
    it('A user should be able to apply for a loan', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(loanData.user1creditRequest)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(201);
          expect(res.body.data.user).to.equal('john.wilson@yahoo.com');
          expect(res.body.data.amount).to.equal(200000);
          expect(res.body.data.interest).to.equal(10000);
          done();
        });
    });
    it('A user should not be able to apply for a loan without amount', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(loanData.user1creditRequestWithoutAmount)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Loan amount is required');
          done();
        });
    });
    it('A user should not be able to apply for a loan without tenor', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(loanData.user1creditRequestWithoutTenor)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Tenor is required');
          done();
        });
    });
    it('A user should not be able to apply for a loan if previous loan is not repaid', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(loanData.user1creditRequest)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('Previous loan not repaid');
          done();
        });
    });
    it('An admin user should be able to get all loans', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.equal(5);
          expect(res.body.data[4].user).to.equal('john.wilson@yahoo.com');
          done();
        });
    });
    it('An admin user should be able to get all loans with pending approval', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans?status=pending&repaid=false')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].repaid).to.equal(false);
          expect(res.body.data[0].status).to.equal('pending');
          expect(res.body.data[0].user).to.equal('levy.right@yahoo.com');
          done();
        });
    });
    it('An admin user should be able to get all repaid loans', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans?status=approved&repaid=true')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.equal(1);
          expect(res.body.data[0].repaid).to.equal(true);
          expect(res.body.data[0].user).to.equal('john.wilson@yahoo.com');
          done();
        });
    });

    it('An admin user should be able to get all loans that are not fully repaid', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans?status=approved&repaid=false&')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].status).to.equal('approved');
          expect(res.body.data[0].repaid).to.equal(false);
          expect(res.body.data[0].user).to.equal('maria.dolphin@yahoo.com');
          expect(res.body.data[0].balance).to.gt(0);
          done();
        });
    });

    it('An admin user should be able to get a specfic loan', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.repaid).to.equal(false);
          expect(res.body.data.status).to.equal('pending');
          expect(res.body.data.user).to.equal('john.wilson@yahoo.com');
          expect(res.body.data.amount).to.equal(200000);
          done();
        });
    });
    it('An admin user should not be able to get a specfic loan with id that does not exist', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans/50')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('loan not found');
          done();
        });
    });
    it('An admin user should be able to approve a loan', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send({ status: 'approved' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.user).to.equal('john.wilson@yahoo.com');
          expect(res.body.data.amount).to.equal(200000);
          done();
        });
    });
    it('An admin user should be able to recject a loan', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/4')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.status).to.equal('rejected');
          expect(res.body.data.user).to.equal('gloria.cold@yahoo.com');
          expect(res.body.data.amount).to.equal(100000);
          done();
        });
    });
    it('An admin user should not be able to approve a loan with invalid id', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/gshghsgh')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Invalid id. id must be an integer');
          done();
        });
    });
    it('An admin user should not be able to approve a loan with unknown id', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/50')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('loan not found');
          done();
        });
    });
    it('An admin user should not be able to approve a loan with invalid status', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send({ status: 'njsjhsjhjs' })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('Loan status is required');
          done();
        });
    });
  });
});
