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
          expect(res.body.data.collector).to.equal('admin.super@gmail.com');
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
          expect(res.status).to.equal(422);
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
          expect(res.status).to.equal(422);
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
          expect(res.body.error).to.equal('Invalid id. id must be a positive integer and greater than 0.');
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
          expect(res.body.errors[0].error).to.equal('Amount is required');
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
          expect(res.body.errors[0]).to.equal('amount is required');
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
          expect(res.status).to.equal(200);
          expect(res.body.data.repayments[0].collector).to.equal('admin.super@gmail.com');
          expect(parseFloat(res.body.data.repayments[0].balance)).to.equal(0);
          expect(parseFloat(res.body.data.repayments.length)).to.equal(1);
          done();
        });
    });
    it('A user should be able to view all loan repayment history', (done) => {
      const { token, isAuth } = userData.userAuth;
      request(app)
        .get('/api/v1/users/kyle.jackson@yahoo.com/repayments')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.repayments[0].collector).to.equal('admin.super@gmail.com');
          expect(parseFloat(res.body.data.repayments[0].balance)).to.equal(0);
          expect(parseFloat(res.body.data.repayments.length)).to.equal(1);
          done();
        });
    });

    it('should allow an admin user to demote a user priviledge', (done) => {
      const { token } = userData.adminAuth;
      request(app)
        .patch('/api/v1/users/adeniyi.jone@gmail.com/role')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .send({ isadmin: false })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(7);
          expect(res.body.data.isadmin).to.equal(false);
          done();
        });
    });

    it('should allow a user to sign in', (done) => {
      request(app)
        .post('/api/v1/auth/signin')
        .set('Accept', 'application/json')
        .send(userData.user2Cred)
        .end((err, res) => {
          userData.user2Auth.token = res.body.data.token;
          expect(res.status).to.equal(200);
          expect(res.body.data.id).to.equal(7);
          expect(res.body.msg).to.equal('user logged in successfully');
          done();
        });
    });


    it('A user should not be able to view all loan repayment history, if loan application is not found', (done) => {
      const { token, isAuth } = userData.user2Auth;
      request(app)
        .get('/api/v1/users/adeniyi.jone@gmail.com/repayments')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}`, isAuth: `${isAuth}` })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Loan Not Found');
          done();
        });
    });
    it('A user should not be able to view a specific loan repayment history of another user', (done) => {
      const { token } = userData.user2Auth;
      request(app)
        .get('/api/v1/loans/4/repayment')
        .set('Accept', 'application/json')
        .set({ authorization: `${token}` })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('Loan Not Found');
          done();
        });
    });
  });
});
