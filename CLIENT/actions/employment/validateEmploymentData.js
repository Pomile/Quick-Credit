const validateEmploymentData = (data) => {
  let isValid = true;
  const error = [];
  const {
    monthlyIncome, grossAnnualIncome, jobPosition, years, sector, address,
  } = data;
  if (isNaN(monthlyIncome) || +monthlyIncome <= 0) {
    isValid = false;
    error.push('monthly income must be a number and must be greater than zero.');
  }

  if (isNaN(grossAnnualIncome) || +grossAnnualIncome <= 0) {
    isValid = false;
    error.push('gross annual income must be a number and must be greater than zero.');
  }
  if (isNaN(years) || +years <= 0) {
    isValid = false;
    error.push('years must an integer and must be greater than zero.');
  }

  if (address === '' || address.length < 4) {
    isValid = false;
    error.push('company address must not be empty.');
  }

  if (jobPosition === '' || jobPosition.length < 4) {
    isValid = false;
    error.push('job position must not be empty.');
  }

  if (sector === '' || sector.length < 4) {
    isValid = false;
    error.push('company sector must not be empty.');
  }

  return { isValid, error };
};

export default validateEmploymentData;
