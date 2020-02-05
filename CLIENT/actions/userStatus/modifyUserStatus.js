import fetch from 'node-fetch';

const modifyUserStatus = (email, status) => {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/v1/users/${email}/verify`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    body: JSON.stringify({ status }),
  }).then(res => res.json()).then((data) => {
    toggleStatus(data.data);
  });
};
export default modifyUserStatus;
