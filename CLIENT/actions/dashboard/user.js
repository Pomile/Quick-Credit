import profileCard from './profileCard';
import loanCard from './loanCard';
import baseUrl from '../../route/endpointPath';

const { NODE_ENV } = process.env;

const userDashboard = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const email = localStorage.getItem('email');

  await fetch(`${baseUrl}/users/${userId}/profile`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.status === 200) {
      profileCard(data.data);
    }
  });

  await fetch(`${baseUrl}/users/${email}/loan`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.status === 200) {
      loanCard(data.data);
    }
  });
};

export default userDashboard;
