import validateEmail from './emailValidator';

const validateUserCredentials = (req) => {
  let isValid = true;
  const errors = [];

  Object.keys(req.body).map((field) => {
    switch (field) {
      case 'email':
        if (validateEmail(req.body[field].trim()) === false) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Email is required' });
        }
        break;
      case 'password':

        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Password is required ' });
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

export default validateUserCredentials;
