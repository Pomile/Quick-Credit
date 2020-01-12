const getBankDetailsData = () => {
  const name = document.querySelector('#bankName').value.trim();
  const accNumber = document.querySelector('#accNumber').value.trim();
  const accType = document.querySelector('#accType').value.trim();
  const accName = document.querySelector('#accName').value.trim();
  const bvn = document.querySelector('#bvn').value.trim();

  return {
    name, accNumber, accType, accName, bvn,
  };
};

export default getBankDetailsData;
