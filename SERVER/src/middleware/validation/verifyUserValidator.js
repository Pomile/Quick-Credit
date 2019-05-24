const validateUserStatus = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'status':
        if (typeof req.body[field] === 'number' || !['verified', 'unverified'].includes(req.body[field].trim()) || !req.body[field].trim()) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: `${req.body[field]} is not a valid user status` });
        }
        break;
      default:
                 // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserStatus;
