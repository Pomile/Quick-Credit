const validateBankData = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'name':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Bank name is required' });
        }
        break;
      case 'accName':
        if (req.body[field].trim() === '') {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Account name is required' });
        }
        break;
      case 'accType':
        if (req.body[field].trim() === '' || !['Savings', 'Current', 'Domicilary'].includes(req.body[field])) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Acount type must be either savings, current or domicilary' });
        }
        break;
      case 'accNumber':
        if (Number.isNaN(parseInt(req.body[field])) || parseInt(req.body[field]).toString().length < 7) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Bank acount number must be a number' });
        }
        break;
      case 'bvn':
        if (Number.isNaN(req.body[field])) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: 'Bvn must be a number' });
        }
        break;
      default:
                 // do nothing
    }
  });
  return { isValid, errors };
};

export default validateBankData;
