import validateEmail from './emailValidator';

const validateUserData = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'firstname':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Firstname is required' });
        }
        break;
      case 'lastname':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Lastname is required' });
        }
        break;
      case 'email':
        if (validateEmail(req.body[field].trim()) === false || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Email is required' });
        }
        break;
      case 'phone':
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Phone is required' });
        }
        break;
      case 'password':

        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Password is required ' });
        }

        if (req.body[field].trim() !== req.body.cpassword.trim()) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Password mismatch' });
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

export default validateUserData;
