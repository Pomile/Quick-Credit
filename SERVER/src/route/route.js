import express from 'express';
import {
  validateUser, validateCredentials, validateHomeAddress, validateJob, validateLoan, validateLoanStat,
} from '../middleware/validation';
import validateUserId from '../middleware/validation/userIdValidator';
import passwordEncryptor from '../middleware/encryption';
import verifyUser from '../middleware/verification';
import user from '../controller/user';
import loan from '../controller/loan';
import validateUserEmail from '../middleware/validation/userEmailValidator';
import permit from '../middleware/permission';
import validateId from '../middleware/validation/idValidator';


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
  '/users/:userId/address',
  verifyUser,
  validateUserId,
  validateHomeAddress,
  user.createUserHomeAddress,
);

routes.post(
  '/users/:userId/address',
  verifyUser,
  validateUserId,
  validateHomeAddress,
  user.createUserHomeAddress,
);

routes.post(
  '/users/:userId/job',
  verifyUser,
  validateUserId,
  validateJob,
  user.createUserJob,
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
  user.verifyUser,
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
export default routes;
