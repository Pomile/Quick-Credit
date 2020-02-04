import baseUrl from '../../../route/endpointPath';
import displayPersonal from './renderPersonaDatal';


const getPersonalData = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');

  fetch(`${baseUrl}/users/${userId}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.error) {
      throw data.error;
    } else {
      displayPersonal(data.data);
    }
  }).catch((err) => {
    console.log(err);
  });
};

export default getPersonalData;
