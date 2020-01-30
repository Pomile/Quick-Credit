const getEmploymentData = () => {
  const monthlyIncome = document.querySelector('#employeeMonthlyIncome').value.trim();
  const grossAnnualIncome = document.querySelector('#employeeGrossAnnualIncome').value.trim();
  const jobPosition = document.querySelector('#employeeJobPosition').value.trim();
  const years = document.querySelector('#employeeYears').value.trim();
  const companyName = document.querySelector('#employeeCompany').value.trim();
  const companyWebsite = document.querySelector('#employeeWebsite').value.trim();

  return {
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, companyWebsite,
  };
};

export default getEmploymentData;
