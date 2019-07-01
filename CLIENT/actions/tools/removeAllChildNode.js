const removeAllTableChildNode = (blockId) => {
  const block = document.getElementById(blockId);
  while (block.hasChildNodes()) {
    block.removeChild(block.firstChild);
  }
};


export default removeAllTableChildNode;
