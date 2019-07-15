import validateEmail from './emailValidator';

const validateUserPassword = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'password':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Password is empty' });
        }

        if (req.body[field].trim().length < 5) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Invalid password' });
        }
        break;
      default:
           // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserPassword;
