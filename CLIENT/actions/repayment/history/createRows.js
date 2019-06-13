import modifyDateFormat from '../../tools/modifyDateFormat';

const createRows = (data, tableId) => {
  const repayments = [...data.repayments].reverse();
  const table = document.querySelector(`#${tableId}`);
  repayments.map((repayment) => {
    const {
      loanid, createon, balance, amount,
    } = repayment;
    const tr = document.createElement('tr');
    tr.className = 'res-tr';
    tr.id = loanid;
    tr.setAttribute('data-loan', JSON.stringify({
      loanid, createon, balance, amount,
    }));
    const newCreatedOnFormat = modifyDateFormat(createon);
    const tableRowData = [loanid, amount, balance, newCreatedOnFormat.date];
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

export default createRows;
