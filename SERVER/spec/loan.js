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
  });
});
