import icons from './icons';


const createRows = (data) => {
  const table = document.querySelector('#verifyUserTable');
  data.map((rowData) => {
    const {
      id, userid, email, homeaddress, state, status, amount, interest, tenor, repaid, phone, firstname, lastname, image,
    } = rowData;
    const tr = document.createElement('tr');
    tr.id = id;
    tr.setAttribute('data-user', JSON.stringify({
      userid, firstname, lastname, status, email, homeaddress, state, phone, image,
    }));
    tr.setAttribute('data-loan', JSON.stringify({
      id, amount, interest, tenor, repaid,
    }));
    const tableRowData = [id, email, homeaddress];
    tableRowData.forEach((tbD, i) => {
      const td = document.createElement('td');
      td.className = 'res-td-5';
      if (i === 2) {
        tbD = `${tbD}, ${state}`;
      }
      const textNode = document.createTextNode(tbD);
      td.appendChild(textNode);
      tr.appendChild(td);
    });
    const operations = icons({
      id, email, status, image,
    });
    tr.insertAdjacentHTML('beforeend', operations);
    table.appendChild(tr);
  });
};

export default createRows;
