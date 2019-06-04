import modifyDateFormat from '../../tools/modifyDateFormat';
import allLoansIcon from './icon';

const createAllLoansRows = (data) => {
  const table = document.querySelector('#allLoans');
  data.map((loan) => {
    const {
      id, status, client, amount, interest, tenor, repaid, duedate, createon,
    } = loan;

    const tr = document.createElement('tr');
    tr.className = 'res-tr';
    tr.id = id;
    tr.client = client;
    tr.setAttribute('data-loan', JSON.stringify({
      id, status, client, amount, interest, tenor, repaid, duedate, createon,
    }));
    const totalLoan = parseFloat(amount) + parseFloat(interest);
    const newDueDateFormat = modifyDateFormat(duedate);
    const newCreatedOnFormat = modifyDateFormat(createon);
    const tableRowData = [id, client, totalLoan, newCreatedOnFormat.date, newDueDateFormat.date];
    tableRowData.map((tbD) => {
      const td = document.createElement('td');
      td.className = 'res-td';
      const textNode = document.createTextNode(tbD);
      td.appendChild(textNode);
      tr.appendChild(td);
    });
    const icons = allLoansIcon({ status, client });
    tr.insertAdjacentHTML('beforeend', icons);
    table.appendChild(tr);
  });
};

export default createAllLoansRows;
