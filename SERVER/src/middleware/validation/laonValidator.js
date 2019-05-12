const validateLoan = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'amount':
        if (req.body[field] <= 0 || typeof req.body[field] !== 'number' || req.body[field] === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Loan amount is required' });
        }
        break;
      case 'tenor':
        if (req.body[field] <= 0 || typeof req.body[field] !== 'number' || req.body[field] === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Tenor is required' });
        }
        break;
      default:
                 // do nothing
    }
  });
  return { isValid, errors };
};

export default validateLoan;
