const amountScreen = () => {
  const amount = document.getElementById('amount');
  document.getElementById('amountScreen').innerHTML = amount.value;
};

const tenorScreen = () => {
  const tenor = document.getElementById('tenor');
  document.getElementById('tenorScreen').innerHTML = tenor.value;
};

export {
  amountScreen,
  tenorScreen,
};
