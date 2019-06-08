import allLoansHeader from './tableHeader';
import createAllLoansRows from './createRows';
import openTab from '../../../assets/js/events/tab';
import removeAllTableChildNode from '../../tools/removeAllChildNode';

const getAllLoans = () => {
  removeAllTableChildNode('allLoans');
  const token = localStorage.getItem('token');
  fetch('http://localhost:8000/api/v1/loans',
    {
      method: 'get',
      headers: { 'Content-Type': 'application/json', authorization: `${token}` },
    }).then(res => res.json()).then((data) => {
    const allLoansTable = document.querySelector('#allLoans');
    allLoansTable.insertAdjacentHTML('beforeend', allLoansHeader);
    createAllLoansRows(data.data, 'allLoans');
    openTab('allLoansBtn', 'allLoansContainer', 'allLoans');
  });
};

export default getAllLoans;
