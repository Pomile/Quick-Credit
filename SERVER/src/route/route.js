import express from 'express';
import {
  validateUser, validateCredentials, validateHomeAddress, validateJob,
} from '../middleware/validation';
import validateUserId from '../middleware/validation/userIdValidator';
import passwordEncryptor from '../middleware/encryption';
import verifyUser from '../middleware/verification';
import user from '../controller/user';

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


export default routes;
