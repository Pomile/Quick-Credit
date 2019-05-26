const validateFields = (req, expectedFields) => {
  let allFieldExists = true;
  const errors = [];
  const data = req.body;
  const availableFields = Object.keys(data);
  expectedFields.forEach((field) => {
    if (!availableFields.includes(field)) {
      errors.push(`${field} is required`);
      allFieldExists = false;
    }
  });
  return { allFieldExists, errors };
};

export default validateFields;
