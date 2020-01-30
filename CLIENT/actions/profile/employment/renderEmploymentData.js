const displayEmploymentData = (data) => {
  const {
    monthlyincome, grossincome, position, years, companyname, companywebsite,
  } = data;
  document.querySelector('#employeeMonthlyIncome').value = monthlyincome;
  document.querySelector('#employeeGrossAnnualIncome').value = grossincome;
  document.querySelector('#employeeJobPosition').value = position;
  document.querySelector('#employeeYears').value = years;
  document.querySelector('#employeeCompany').value = companyname;
  document.querySelector('#employeeWebsite').value = companywebsite;
};

export default displayEmploymentData;
