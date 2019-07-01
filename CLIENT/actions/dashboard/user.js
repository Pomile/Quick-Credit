import profileCard from './profileCard';

const userDashboard = async () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  await fetch(`http://localhost:8000/api/v1/users/${userId}/profile`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.status) {
      profileCard(data.data);
    }
  });
};

export default userDashboard;
