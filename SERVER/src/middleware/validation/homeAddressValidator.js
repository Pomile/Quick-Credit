const validateUserHomeAddress = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).map((field) => {
    switch (field) {
      case 'address':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Address is required' });
        }
        break;
      case 'state':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'State is required' });
        }
        break;
      default:
               // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserHomeAddress;
