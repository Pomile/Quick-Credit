import express from 'express';
import {
  validateUser, validateCredentials, validateHomeAddress, validateJob, validateLoan,
} from '../middleware/validation';
import validateUserId from '../middleware/validation/userIdValidator';
import passwordEncryptor from '../middleware/encryption';
import verifyUser from '../middleware/verification';
import user from '../controller/user';
import loan from '../controller/loan';
import validateUserEmail from '../middleware/validation/userEmailValidator';


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
  validateUserEmail,
  user.verifyUser,
);

export default routes;
