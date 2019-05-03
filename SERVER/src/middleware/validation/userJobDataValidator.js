const validateUserJobData = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).map((field) => {
    switch (field) {
      case 'officeAddress':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Office address is required' });
        }
        break;
      case 'state':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'State is required' });
        }
        break;
      case 'position':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Job position is required' });
        }
        break;
      case 'monthlyIncome':
        if (typeof req.body[field] !== 'number') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Monthly income is required' });
        }
        break;
      case 'companyName':

        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Company name is required' });
        }
        break;
      default:
             // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserJobData;
