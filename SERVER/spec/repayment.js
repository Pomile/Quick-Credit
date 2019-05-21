import chai from 'chai';
import request from 'supertest';
import app from '../server';
import userData from './data/user';
import repaymentData from './data/repayment';

const { expect } = chai;

describe('QUICK-CREDIT Test Suite', () => {
  describe('Repayment API', () => {
    it('An admin user should be able to make payment', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/5/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2Post1)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(201);
          expect(parseFloat(res.body.data.amount)).to.equal(210000);
          expect(res.body.data.collector).to.equal('adeniyi.jone@gmail.com');
          expect(parseFloat(res.body.data.balance)).to.equal(0);
          done();
        });
    });
    it('An admin user should not be able to make payment if a loan is fully repaid', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/5/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2Post2)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('Repayment error.Loan repayment is balanced');
          done();
        });
    });
    it('An admin user should not be able to make payment if a loan id does not exist', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/50/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2Post2)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('loan not found');
          done();
        });
    });
    it('An admin user should not be able to make payment if a loan is not approved', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/4/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2Post2)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(409);
          expect(res.body.error).to.equal('Loan is not approved');
          done();
        });
    });
    it('An admin user should not be able to make payment with invalid id', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/gyyuuy/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2Post1)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Invalid id. id must be an integer');
          done();
        });
    });
    it('An admin user should not be able to make payment without amount', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/5/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2PostWithoutAmount)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(422);
          expect(res.body.error).to.equal('Amount is required');
          done();
        });
    });
    it('An admin user should not be able to make payment without amount property', (done) => {
      const { token, isAuth } = userData.adminAuth;
      request(app)
        .post('/api/v1/loans/5/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .send(repaymentData.user2PostWithoutAmountProp)
        .end((err, res) => {
          // console.log(res.body);
          expect(res.status).to.equal(400);
          expect(res.body.error).to.equal('amount is required');
          done();
        });
    });
    it('A user should be able to view a specific loan repayment history', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .get('/api/v1/loans/5/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(200);
          expect(res.body.data.collector).to.equal('adeniyi.jone@gmail.com');
          expect(parseFloat(res.body.data.balance)).to.equal(0);
          done();
        });
    });
    it('A user should not be able to view a specific loan repayment history of another user', (done) => {
      const { token } = userData.userAuth;
      request(app)
        .get('/api/v1/loans/4/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Loan Not Found');
          done();
        });
    });
  });
});
