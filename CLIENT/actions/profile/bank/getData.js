const getBankDetailsData = () => {
  const name = document.querySelector('#bankName').value.trim();
  const accNumber = document.querySelector('#accountNum').value.trim();
  const accName = document.querySelector('#accountName').value.trim();
  const bvn = document.querySelector('#bvn').value.trim();

  return {
    name, accNumber, accName, bvn,
  };
};

export default getBankDetailsData;
