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
        displayBankDetails(data.data);
        profileAlert('User bank details successfully added', '-green');
      }
    });
  }
};
export default addUserBankDetails;
