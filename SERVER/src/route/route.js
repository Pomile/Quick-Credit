import express from 'express';
import cors from 'cors';
import {
  validateUser, validateCredentials, validateHomeAddress, validateJob, validateLoan, validateLoanStat, validateRepayment, validateUserIsadminPriv, validateUserStat,
} from '../middleware/validation';
import passwordEncryptor from '../middleware/encryption';
import verifyUser from '../middleware/verification';
import user from '../controller/user';
import loan from '../controller/loan';
import validateUserEmail from '../middleware/validation/userEmailValidator';
import permit from '../middleware/permission';
import validateId from '../middleware/validation/idValidator';
import repayment from '../controller/repayment';
import validateEmail from '../middleware/validation/emailValidator';


const routes = express.Router();

routes.post(
  '/auth/signup',
  validateUser,
  passwordEncryptor,
  user.createAccount,
);

routes.post(
  '/auth/signin',
  validateCredentials,
  user.authenticate,
);

routes.post(
  '/users/:id/address',
  verifyUser,
  validateId,
  validateHomeAddress,
  user.createUserHomeAddress,
);

routes.post(
  '/users/:id/job',
  verifyUser,
  validateId,
  validateJob,
  user.createUserJob,
);

routes.get(
  '/users',
  verifyUser,
  permit,
  user.getUsersbyStatus,
);


routes.post(
  '/loans',
  verifyUser,
  validateLoan,
  loan.createLoan,
);

routes.patch(
  '/users/:email/verify',
  verifyUser,
  permit,
  validateUserEmail,
  validateUserStat,
  user.verifyUser,
);

routes.patch(
  '/users/:email/role',
  verifyUser,
  permit,
  validateUserIsadminPriv,
  validateUserEmail,
  user.modifyUserAdminPriviledge,
);

routes.get(
  '/loans',
  verifyUser,
  permit,
  loan.getAllLoans,
);

routes.patch(
  '/loans/:id',
  verifyUser,
  permit,
  validateLoanStat,
  validateId,
  loan.modifyLoanStatus,
);

routes.get(
  '/loans/:id',
  verifyUser,
  permit,
  validateId,
  loan.getLoan,
);
routes.post(
  '/loans/:id/repayment',
  verifyUser,
  permit,
  validateId,
  validateRepayment,
  repayment.postRepayment,
);

routes.get(
  '/loans/:id/repayment',
  verifyUser,
  validateId,
  repayment.getRepaymentHistory,
);

routes.get(
  '/users/:email/repayments',
  verifyUser,
  validateUserEmail,
  repayment.getAllRepaymentHistory,
);

export default routes;
