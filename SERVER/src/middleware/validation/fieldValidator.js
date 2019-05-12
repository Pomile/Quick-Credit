const validateFields = (req, expectedFields) => {
  let allFieldExists = true;
  const error = [];
  const data = req.body;
  const availableFields = Object.keys(data);
  expectedFields.forEach((field) => {
    if (!availableFields.includes(field)) {
      error.push(`${field} is required`);
      allFieldExists = false;
    }
  });
  return { allFieldExists, error };
};

export default validateFields;
