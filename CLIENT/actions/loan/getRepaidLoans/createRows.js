import modifyDateFormat from '../../tools/modifyDateFormat';

const createRepaidLoansRows = (data) => {
  const table = document.querySelector('#repaidLoans');
  data.map((loan) => {
    const {
      id, client, balance, amount, interest, duedate, createon, 
    } = loan;
    const tr = document.createElement('tr');
    tr.className = 'res-tr';
    tr.id = id;
    tr.client = client;
    tr.setAttribute('data-loan', JSON.stringify({
      id, balance, client, amount, interest, duedate, createon,
    }));
    const totalLoan = parseFloat(amount) + parseFloat(interest);
    const newDueDateFormat = modifyDateFormat(duedate);
    const newCreatedOnFormat = modifyDateFormat(createon);
    const tableRowData = [id, client, balance, totalLoan, newCreatedOnFormat.date, newDueDateFormat.date];
    tableRowData.map((tbD) => {
      const td = document.createElement('td');
      td.className = 'res-td-3';
      const textNode = document.createTextNode(tbD);
      td.appendChild(textNode);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
};

export default createRepaidLoansRows;
