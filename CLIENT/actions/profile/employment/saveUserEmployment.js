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
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, companyWebsite,
  } = empData;
  const isUserEmploymentValid = validateEmploymentData({
    monthlyIncome, grossAnnualIncome, jobPosition, years, companyName, companyWebsite,
  });
  document.getElementById('spinner-sm').style.display = 'inline-block';
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
        companyWebsite,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        throw new Error(data.error);
      } else if (data.errors) {
        throw new Error(data.errors[0].error);
      } else {
        displayEmploymentData(data.data);
        alert(data.data.msg);
      }
    }).catch((err) => {
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop2', 'errorBox');
    })
      .finally(() => document.getElementById('spinner-sm').style.display = 'none');
  }
};

export default saveUserEmployment;
