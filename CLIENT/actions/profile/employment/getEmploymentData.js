import baseUrl from '../../../route/endpointPath';
import displayEmploymentData from './renderEmploymentData';

const getEmploymentDetails = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  fetch(`${baseUrl}/users/${userId}/job`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.error) {
      throw data.error;
    } else {
      console.log(data);
      displayEmploymentData(data.data);
    }
  }).catch((err) => {
    console.log(err.message);
  });
};

export default getEmploymentDetails;
