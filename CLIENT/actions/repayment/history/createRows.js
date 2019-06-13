import modifyDateFormat from '../../tools/modifyDateFormat';
import icon from './icon';

const allRepaymentsRows = (repayments, tableId) => {
  const table = document.querySelector(`#${tableId}`);
  repayments.map((repayment) => {
    const {
      loanid, createon, balance, amount,
    } = repayment;
    const tr = document.createElement('tr');
    tr.className = 'res-tr';
    tr.id = loanid;
    tr.setAttribute('data-repayment', JSON.stringify({
      loanid, createon, balance, amount,
    }));
    const newCreatedOnFormat = modifyDateFormat(createon);
    const tableRowData = [loanid, amount, balance, newCreatedOnFormat.date];
    tableRowData.map((tbD) => {
      const td = document.createElement('td');
      td.className = 'res-td-4';
      const textNode = document.createTextNode(tbD);
      td.appendChild(textNode);
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
};

const repaymentsRows = (repayments, loan, tableId) => {
  const table = document.querySelector(`#${tableId}`);
  console.log(repayments, loan);
  repayments.map((repayment) => {
    const {
      loanid, createon, balance, amount,
    } = repayment;
    const tr = document.createElement('tr');
    tr.className = 'res-tr';
    tr.id = loanid;
    tr.setAttribute('data-repayment', JSON.stringify({
      loanid, createon, balance, amount,
    }));

    const newCreatedOnFormat = modifyDateFormat(createon);
    const newDueDateFormat = modifyDateFormat(loan.duedate);
    const tableRowData = [loanid, amount, newCreatedOnFormat.date, balance, newDueDateFormat.date];
    tableRowData.map((tbD) => {
      const td = document.createElement('td');
      td.className = 'res-td-4';
      const textNode = document.createTextNode(tbD);
      td.appendChild(textNode);
      tr.appendChild(td);
    });
    const iconData = icon(loan.monthlyinstallment, amount, balance);
    tr.insertAdjacentHTML('beforeend', iconData);
    table.appendChild(tr);
  });
};
const createRows = (data, tableId, header) => {
  const repayments = [...data.repayments].reverse();

  if (header === 1) {
    allRepaymentsRows(repayments, tableId);
  } else if (header === 2) {
    const loan = { ...data.loan };
    repaymentsRows(repayments, loan, tableId);
  }
};

export default createRows;
