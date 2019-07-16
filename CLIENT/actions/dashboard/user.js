import profileCard from './profileCard';
import loanCard from './loanCard';

const userDashboard = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  const email = localStorage.getItem('email');
  await fetch(`http://localhost:8000/api/v1/users/${userId}/profile`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.status === 200) {
      profileCard(data.data);
    }
  });
  await fetch(`http://localhost:8000/api/v1/users/${email}/loan`,
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
