import validateEmail from './emailValidator';
import data from '../../data';
import userHelpers from '../../helpers/user';


const validateUserEmail = (req, res, next) => {
  const { email } = req.params;
  const isEmailValid = validateEmail(email);
  if (isEmailValid) {
    const findUser = userHelpers.findUser(data.users, email, 'email');
    if (findUser.exist) {
      req.body = findUser.data;
      next();
    } else {
      res.status(404).json({ status: 404, error: 'user not found' });
    }
  } else {
    res.status(422).json({ status: 422, error: 'Invalid email' });
  }
};

export default validateUserEmail;
