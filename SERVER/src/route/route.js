import express from 'express';
import { validateUser, validateCredentials } from '../middleware/validation';
import passwordEncryptor from '../middleware/encryption';
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


export default routes;
