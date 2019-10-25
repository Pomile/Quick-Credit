import displayAccount from './displayAccount';
import displayAddress from '../address/displayAddress';
import displayEmploymentData from '../employment/displayEmployment';
import displayBankDetails from '../bank/displayBankDetails';
import baseUrl from '../../route/endpointPath';

const getUserProfile = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  fetch(`${baseUrl}/users/${userId}/profile`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.status === 200) {
      displayAccount(data.data);
      displayAddress(data.data);
      displayEmploymentData(data.data);
      displayBankDetails(data.data);
    }
  });
};

export default getUserProfile;
