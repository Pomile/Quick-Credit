import express from 'express';
import multer from 'multer';
import {
  validateUser, validateCredentials, validateHomeAddress, validateJob, validateLoan, validateLoanStat, validateRepayment, validateUserIsadminPriv, validateUserStat, validateBankDetails, validateUserImage,
} from '../middleware/validation';
import passwordEncryptor from '../middleware/encryption';
import verifyUser from '../middleware/verification';
import user from '../controller/user';
import loan from '../controller/loan';
import validateUserEmail from '../middleware/validation/userEmailValidator';
import permit from '../middleware/permission';
import validateId from '../middleware/validation/idValidator';
import repayment from '../controller/repayment';


const routes = express.Router();
const upload = multer({ dest: 'uploads/' });
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
  '/users/:id/bank',
  verifyUser,
  validateId,
  validateBankDetails,
  user.createUserBankDetails,
);

routes.post(
  '/users/:id/job',
  verifyUser,
  validateId,
  validateJob,
  user.createUserJob,
);

routes.get(
  '/users/:id/profile',
  verifyUser,
  validateId,
  user.getUserProfile,
);

routes.patch(
  '/users/:id/profile/image',
  verifyUser,
  validateUserImage,
  user.updateUserImage,
);
routes.get(
  '/users',
  verifyUser,
  permit,
  user.getUsersbyStatus,
);

routes.get(
  '/users/:email/loan',
  verifyUser,
  validateUserEmail,
  loan.getUserLatestLoan,
);

routes.get(
  '/users/:email/forgot-password',
  validateUserEmail,
  user.authorizeEmailAcount,
);
routes.post(
  '/loans',
  verifyUser,
  validateLoan,
  loan.createLoan,
);

routes.get(
  '/loans/summary',
  verifyUser,
  permit,
  loan.getLoanSummary,
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
