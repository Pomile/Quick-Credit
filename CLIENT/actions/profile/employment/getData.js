const getEmploymentData = () => {
  const monthlyIncome = document.querySelector('#employeeMonthlyIncome').value.trim();
  const grossAnnualIncome = document.querySelector('#employeeGrossAnnualIncome').value.trim();
  const jobPosition = document.querySelector('#employeeJobPosition').value.trim();
  const years = document.querySelector('#employeeYears').value.trim();
  const companyName = document.querySelector('#companyName').value.trim();
  const sector = document.querySelector('#companySector').value.trim();
  const address = document.querySelector('#companyAddress').value.trim();
  const state = document.querySelector('#companyState').value.trim();

  return {
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, sector, address, state,
  };
};

export default getEmploymentData;
