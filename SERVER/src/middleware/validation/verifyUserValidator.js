const validateUserStatus = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'status':
        if (!['verified', 'unverified'].includes(req.body[field].trim()) || !req.body[field].trim() || typeof req.body[field].trim() !== 'string') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Loan status is required' });
        }
        break;
      default:
                 // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserStatus;
