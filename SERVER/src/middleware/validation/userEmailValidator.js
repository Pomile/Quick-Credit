import validateEmail from './emailValidator';
import userHelpers from '../../helpers/user';


const validateUserEmail = async (req, res, next) => {
  const { email } = req.params;
  const isEmailValid = validateEmail(email);
  if (isEmailValid) {
    const findUser = await userHelpers.findUser('users', 'email', email);
    if (findUser.exist) {
      next();
    } else {
      res.status(404).json({ status: 404, error: 'user not found' });
    }
  } else {
    res.status(422).json({ status: 422, error: 'Invalid email' });
  }
};

export default validateUserEmail;
