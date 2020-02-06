import baseUrl from '../../../route/endpointPath';
import loanDetailTemplate from './getLoanDetailsTemp';
import { openDetails } from '../../../assets/js/events/userDetailsControl';
import removeAllTableChildNode from '../../tools/removeAllChildNode';

const getUserLoanDetails = (loanId) => {
  const token = localStorage.getItem('token');
  fetch(`${baseUrl}/user/loans/${loanId}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    if (data.data.error) {
      const { error } = data.data;
      throw new Error(error);
    }
    // display a user loan details
    const temp = loanDetailTemplate(data.data);
    const modalBox = document.getElementById('modalBox');
    removeAllTableChildNode('modalBox');
    modalBox.insertAdjacentHTML('beforeend', temp);
    openDetails();
  }).catch((err) => {
    alert(err.message);
  });
};

export default getUserLoanDetails;
