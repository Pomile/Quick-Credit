import validateEmploymentData from './validateEmploymentData';
import getEmploymentData from './getData';
import displayEmploymentData from './displayEmployment';
import { profileAlert } from '../tools/alert';
import baseUrl from '../../route/endpointPath';


const addUserEmployment = () => {
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const empData = getEmploymentData();
  const {
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, sector, address, state,
  } = empData;
  const isUserEmploymentValid = validateEmploymentData({
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, sector, address, state,
  });

  if (isUserEmploymentValid.isValid) {
    fetch(`${baseUrl}/users/${userId}/job`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        monthlyIncome: parseFloat(monthlyIncome),
        grossIncome: parseFloat(grossAnnualIncome),
        position: jobPosition,
        years: parseInt(years),
        companyName,
        officeAddress: address,
        state,
        companySector: sector,
      }),
    }).then(res => res.json()).then((data) => {
      console.log(data);
      if (data.status === 409 && data.error) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop2', 'errorBox');
      } else if (data.status === 422 && data.errors) {
        document.getElementById('msg').innerHTML = data.errors[0].error;
        open('backdrop2', 'errorBox');
      } else if (data.status === 404) {
        document.getElementById('msg').innerHTML = data.error;
        open('backdrop2', 'errorBox');
      } else {
        displayEmploymentData(data.data);
        profileAlert('User employment details successfully added', '-green');
      }
    });
  } else {
    console.log(isUserEmploymentValid);
  }
};

export default addUserEmployment;
