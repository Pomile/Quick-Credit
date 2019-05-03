import fieldValidator from './validation/fieldValidator';
import userDataValidator from './validation/userDataValidator';
import userCredentialsValidator from './validation/userCredentialsValidator';
import homeAddressValidator from './validation/homeAddressValidator';
import { userFields, loginFields, houseAddress } from './validation/fields';

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

export const validateCredentials = (req, res, next) => {
  const fieldResult = fieldValidator(req, loginFields);
  const userDataResult = userCredentialsValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error }).end();
  } else if (!userDataResult.isValid) {
    res.status(400).json({ error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};

export const validateHomeAddress = (req, res, next) => {
  const fieldResult = fieldValidator(req, houseAddress);
  const userDataResult = homeAddressValidator(req);
  if (!fieldResult.allFieldExists) {
    res.status(400).json({ error: fieldResult.error }).end();
  } else if (!userDataResult.isValid) {
    res.status(400).json({ error: userDataResult.errors[0].error }).end();
  } else {
    next();
  }
};
