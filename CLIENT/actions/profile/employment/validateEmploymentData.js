const validateEmploymentData = (data) => {
  let isValid = true;
  const error = [];
  const {
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, companyWebsite,
  } = data;
  const employeeMonthlyIncome = document.getElementById('employeeMonthlyIncome');
  const employeeGrossAnnualIncome = document.getElementById('employeeGrossAnnualIncome');
  const employeeJobPosition = document.getElementById('employeeJobPosition');
  const employeeYears = document.getElementById('employeeYears');
  const employeeCompanyName = document.getElementById('employeeCompany');
  const employeeCompanyWebsite = document.getElementById('employeeWebsite');
  if (isNaN(monthlyIncome) || +monthlyIncome <= 0) {
    isValid = false;
    employeeMonthlyIncome.style.border = '1px solid red';
  } else {
    employeeMonthlyIncome.style.border = 'none';
  }

  if (isNaN(grossAnnualIncome) || +grossAnnualIncome <= 0) {
    isValid = false;
    employeeGrossAnnualIncome.style.border = '1px solid red';
  } else {
    employeeGrossAnnualIncome.style.border = 'none';
  }
  if (isNaN(years) || +years <= 0) {
    isValid = false;
    employeeYears.style.border = '1px solid red';
  } else {
    employeeYears.style.border = 'none';
  }

  if (companyName === '' || companyName.length < 4) {
    isValid = false;
    employeeCompanyName.style.border = '1px solid red';
  } else {
    employeeCompanyName.style.border = 'none';
  }

  if (jobPosition === '' || jobPosition.length < 4) {
    isValid = false;
    employeeJobPosition.style.border = '1px solid red';
  } else {
    employeeJobPosition.style.border = 'none';
  }

  if (companyWebsite === '' || companyWebsite.length < 5) {
    isValid = false;
    employeeCompanyWebsite.style.border = '1px solid red';
  } else {
    employeeCompanyWebsite.style.border = 'none';
  }

  return { isValid };
};

export default validateEmploymentData;
