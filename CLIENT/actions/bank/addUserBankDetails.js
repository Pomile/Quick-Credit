import getBankDetailsData from './getData';
import validateBankDetails from './validateBankDetailsData';
import { profileAlert } from '../tools/alert';
import displayBankDetails from './displayBankDetails';
import baseUrl from '../../route/endpointPath';

const addUserBankDetails = () => {
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const bankData = getBankDetailsData();
  const isBankDataValid = validateBankDetails(bankData);
  if (isBankDataValid.isValid) {
    const {
      name, accName, accNumber, accType, bvn,
    } = bankData;
    fetch(`${baseUrl}/users/${userId}/bank`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
      body: JSON.stringify({
        name,
        accName,
        accNumber,
        accType,
        bvn,
      }),
    }).then(res => res.json()).then((data) => {
      if (data.status === 409 && data.error) {
        throw new Error(data.error);
      } else if (data.status === 422 && data.errors) {
        throw new Error(data.errors[0].error);
      } else if (data.status === 404) {
        throw new Error(data.error);
      } else {
        displayBankDetails(data.data);
        profileAlert('User bank details successfully added', '-green');
      }
    }).catch((err) => {
      document.getElementById('msg').innerHTML = err.message;
      open('backdrop2', 'errorBox');
    });
  }
};
export default addUserBankDetails;
