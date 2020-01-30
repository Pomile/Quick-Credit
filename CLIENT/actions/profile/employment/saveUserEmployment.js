import validateEmploymentData from './validateEmploymentData';
import getEmploymentData from './getData';
import displayEmploymentData from './renderEmploymentData';
import { profileAlert } from '../../tools/alert';
import baseUrl from '../../../route/endpointPath';


const saveUserEmployment = () => {
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
      if (data.status === 409 && data.error) {
        throw new Error(data.error);
      } else if (data.status === 422 && data.errors) {
        throw new Error(data.errors[0].error);
      } else if (data.status === 404) {
        throw new Error(data.error);
      } else {
        displayEmploymentData(data.data);
        profileAlert('User employment details successfully added', '-green');
      }
    }).catch((err) => {
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop2', 'errorBox');
    });
  }
};

export default saveUserEmployment;