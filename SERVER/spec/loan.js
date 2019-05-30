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
          expect(res.status).to.equal(201);
          expect(res.body.data.client).to.equal('kyle.jackson@yahoo.com');
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
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Loan amount is required');
          done();
        });
    });
    it('A user should not be able to apply for a loan without amount property', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .post('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(loanData.user1creditRequestWithoutAmountProp)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('amount is required');
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
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Tenor is required');
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
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Previous loan not repaid');
          done();
        });
    });
    it('An admin user should not be able to approve a loan for a user that is not verified', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/4')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'approved' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('loan status not modified. please ensure the user is verified');
          done();
        });
    });

    it('An admin user should be able to approve a loan', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'approved' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.status).to.equal('approved');
          done();
        });
    });
    it('An admin user should be able to recject a loan', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/3')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.status).to.equal('rejected');
          done();
        });
    });
    it('An admin user should not be able to approve a loan with invalid id', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/gshghsgh')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid id. id must be an integer');
          done();
        });
    });
    it('An admin user should not be able to approve a loan with loan id that does not exist', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/50')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'rejected' })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('loan not found');
          done();
        });
    });
    it('An admin user should not be able to approve a loan without status property', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0]).to.equal('status is required');
          done();
        });
    });
    it('An admin user should not be able to approve a loan with invalid status', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ status: 'njsjhsjhjs' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body.errors[0].error).to.equal('Loan status is required');
          done();
        });
    });
    it('An admin user should be able to get all loans', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          const loan = res.body.data.find(userLoan => userLoan.id === 5);
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.equal(5);
          expect(loan.client).to.equal('kyle.jackson@yahoo.com');
          done();
        });
    });
    it('A user should not be able to get all loans', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .get('/api/v1/loans')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.error).to.equal('access denied');
          done();
        });
    });
    it('An admin user should be able to get all loans with pending approval', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans?status=pending&repaid=false')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          const userLoan = res.body.data.find(loan => loan.client === 'john.wilson@yahoo.com');
          expect(res.status).to.equal(200);
          expect(userLoan.repaid).to.equal(false);
          expect(userLoan.status).to.equal('pending');
          expect(userLoan.client).to.equal('john.wilson@yahoo.com');
          expect(res.body.data.length).to.equal(3);
          done();
        });
    });

    it('An admin user should be able to get all loans that are not fully repaid', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans?status=approved&repaid=false')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data[0].status).to.equal('approved');
          expect(res.body.data[0].repaid).to.equal(false);
          expect(res.body.data[0].client).to.equal('kyle.jackson@yahoo.com');
          expect(parseFloat(res.body.data[0].balance)).to.gt(0);
          done();
        });
    });
    it('An admin user should be able to get all repaid loans', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans?status=approved&repaid=true')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.equal(0);
          done();
        });
    });

    it('An admin user should be able to get a specfic loan', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans/5')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.repaid).to.equal(false);
          expect(res.body.data.status).to.equal('approved');
          expect(res.body.data.client).to.equal('kyle.jackson@yahoo.com');
          expect(parseFloat(res.body.data.amount)).to.equal(200000);
          done();
        });
    });
    it('An admin user should not be able to get a specfic loan with id that does not exist', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/loans/50')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('loan not found');
          done();
        });
    });
    it('should allow an admin user to get users by status who has also applied for a loan', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .get('/api/v1/users?status=unverified')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.length).to.equal(0);
          done();
        });
    });
  });
});
