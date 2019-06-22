const validateUserImg = (req) => {
  let isValid = true;
  const errors = [];
  Object.keys(req.body).forEach((field) => {
    switch (field) {
      case 'imageUrl':
        const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
        if (req.body[field].trim() === '' || typeof req.body[field].trim() !== 'string' || !re.test(req.body[field].trim())) {
          isValid = false;
          errors.push({ field, value: req.body[field], error: `${req.body[field].trim()} is not a valid url` });
        }
        break;
      default:
                 // do nothing
    }
  });
  return { isValid, errors };
};

export default validateUserImg;
