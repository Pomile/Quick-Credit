const removeOneLastChild = (blockId) => {
  const block = document.getElementById(blockId);
  let counter = 0;
  while (counter <= 1) {
    block.removeChild(block.lastChild);
    counter += 1;
  }
};


export default removeOneLastChild;
