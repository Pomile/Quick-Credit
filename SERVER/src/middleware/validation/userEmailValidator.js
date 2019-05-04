import validateEmail from './emailValidator';
import data from '../../data';
import findUserByEmail from '../../helpers/findUserByEmail';


const validateUserEmail = (req, res, next) => {
  const { email } = req.params;
  const isEmailValid = validateEmail(email);
  if (isEmailValid) {
    const findUser = findUserByEmail(data.users, email);
    if (findUser.userExists) {
      req.body = findUser.data;
      next();
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } else {
    res.status(400).json({ error: 'Invalid email' });
  }
};

export default validateUserEmail;
