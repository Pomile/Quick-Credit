const validateUserImg = (req) => {
  const isValid = true;

  if (req.file.mimetype === 'image/jpeg' || req.file.mimetype === 'image/png') {
    return { isValid, error: null };
  }
  return { isValid: false, error: 'Invalid image type' };
};

export default validateUserImg;
