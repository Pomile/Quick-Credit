import validateEmail from './emailValidator';

const validateUserData = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'firstname':
        if (!req.body[field].trim() || typeof req.body[field] !== 'string' || req.body[field].length <= 1) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Firstname is required' });
        }
        break;
      case 'lastname':
        if (!req.body[field].trim() || typeof req.body[field] !== 'string' || req.body[field].length <= 1) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Lastname is required' });
        }
        break;
      case 'email':
        if (validateEmail(req.body[field]) === false) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Check your email address' });
        }
        break;
      case 'phone':
        console.log(req.body[field].length);
        if (req.body[field].length < 10 || isNaN(req.body[field])) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Phone is required and must be a number' });
        }
        break;
      default:
            // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserData;
