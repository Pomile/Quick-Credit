const validateUserIsadmin = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'isadmin':
        if (![true, false].includes(req.body[field]) || typeof req.body[field] !== 'boolean') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: `${req.body[field]} is not a valid value` });
        }
        break;
      default:
            // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserIsadmin;
