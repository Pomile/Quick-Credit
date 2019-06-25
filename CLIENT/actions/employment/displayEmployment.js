const displayEmploymentData = (data) => {
  const {
    monthlyincome, grossincome, position, years, companyname, companysector, officeaddress, state,
  } = data;
  document.querySelector('#employeeMonthlyIncome').value = monthlyincome;
  document.querySelector('#employeeGrossAnnualIncome').value = grossincome;
  document.querySelector('#employeeJobPosition').value = position;
  document.querySelector('#employeeYears').value = years;
  document.querySelector('#companyName').value = companyname;
  document.querySelector('#companySector').value = companysector;
  document.querySelector('#companyAddress').value = officeaddress;
  document.querySelector('#companyState').value = state;
  document.querySelector('#saveUserEmployment').classList.add('disabled');
  document.getElementById('saveUserEmployment').disabled = true;
};

export default displayEmploymentData;
