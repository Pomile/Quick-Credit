const removeAllTableChildNode = (tableSelector) => {
  const table = document.getElementById(tableSelector);
  while (table.hasChildNodes()) {
    table.removeChild(table.firstChild);
  }
};


export default removeAllTableChildNode;
