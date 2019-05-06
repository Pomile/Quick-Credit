const validateRepaymentVal = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'amount':
        if (req.body[field] === 0 || typeof req.body[field] !== 'number') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Amount is required' });
        }
        break;
      default:
                   // do nothing
    }
  });
  return { isValid, errors };
};

export default validateRepaymentVal;
