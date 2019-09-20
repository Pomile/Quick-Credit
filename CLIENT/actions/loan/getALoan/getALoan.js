import getLoanDetailTemp from './getALoanTemplate';
import removeAllTableChildNode from '../../tools/removeAllChildNode';
import { openDetails } from '../../../assets/js/events/userDetailsControl';

const gtLoan = (loanId) => {
  const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/v1/loans/${loanId}`,
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    console.log(data);
    if (data.status === 200) {
      const temp = getLoanDetailTemp(data.data);
      const modalBox = document.getElementById('modalBox');
      removeAllTableChildNode('modalBox');
      modalBox.insertAdjacentHTML('beforeend', temp);
      openDetails();
    }
  });
};

export default gtLoan;
