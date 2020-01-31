import getBankDetailsData from './getData';
import validateBankDetails from './validateBankData';
import { profileAlert } from '../../tools/alert';
import displayBankDetails from './renderBankDetails';
import baseUrl from '../../../route/endpointPath';

const saveBankDetails = () => {
  
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const bankData = getBankDetailsData();
  const isBankDataValid = validateBankDetails(bankData);
  if (isBankDataValid.isValid) {
    document.getElementById('spinner-sm').style.display = 'inline-block';
    const {
      name, accName, accNumber, bvn,
    } = bankData;
    fetch(`${baseUrl}/users/${userId}/bank`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        name,
        accName,
        accNumber,
        bvn,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        throw new Error(data.error);
      } else if (data.errors) {
        throw new Error(data.errors[0].error);
      } else {
        displayBankDetails(data.data);
        alert(data.data.msg);
      }
    }).catch((err) => {
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop2', 'errorBox');
    })
      .finally(() => {
        document.getElementById('spinner-sm').style.display = 'none';
      });
  }
};
export default saveBankDetails;
