const displayBankDetails = (data) => {
  const {
    name, accname, accnumber, acctype, bvn,
  } = data;
  document.querySelector('#bankName').value = name;
  document.querySelector('#accNumber').value = accnumber;
  document.querySelector('#accType').value = acctype;
  document.querySelector('#accName').value = accname;
  document.querySelector('#bvn').value = bvn;
};

export default displayBankDetails;
