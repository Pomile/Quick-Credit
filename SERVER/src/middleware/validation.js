import fieldValidator from './validation/fieldValidator';
import userDataValidator from './validation/userDataValidator';
import { userFields } from './validation/fields';

export const validateUser = (req, res, next) => {
  const fieldResult = fieldValidator(req, userFields);
  const userDataResult = userDataValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error }).end();
  } else if (!userDataResult.isValid) {
    res.status(400).json({ error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};
