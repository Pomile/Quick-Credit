import baseUrl from '../../../route/endpointPath';
import displayBankDetails from './renderBankDetails';

const getBankDetails = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  fetch(`${baseUrl}/users/${userId}/bank`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.error) {
      throw data.error;
    } else {
      displayBankDetails(data.data);
    }
  }).catch((err) => {
    alert(err.message);
  });
};

export default getBankDetails;
