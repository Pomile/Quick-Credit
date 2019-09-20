import { openDetails } from '../../assets/js/events/userDetailsControl';
import removeAllTableChildNode from '../tools/removeAllChildNode';
import defaultImg from '../../assets/images/mary_jane.jpg';
import userDetailTemplate from './userDetailTemplate';


const userDetails = (userId) => {
  const user = JSON.parse(document.getElementById(userId).dataset.user);
  const loan = JSON.parse(document.getElementById(userId).dataset.loan);
  let color = '-fc-amber-1';
  const img = user.image === null ? defaultImg : user.image;
  console.log(loan);
  if (user.status === 'verified') {
    color = '-fc-green-1';
  }
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/v1/users/${userId}/profile`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    console.log(data);
    const template = userDetailTemplate(img, color, data.data, user.state, loan);
    const modalBox = document.getElementById('modalBox');
    removeAllTableChildNode('modalBox');
    modalBox.insertAdjacentHTML('beforeend', template);
    openDetails();
  });
};

export default userDetails;
