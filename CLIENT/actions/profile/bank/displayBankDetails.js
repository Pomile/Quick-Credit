const displayBankDetails = (data) => {
  const {
    name, accname, accnumber, acctype, bvn,
  } = data;
  if (name !== null || accnumber !== null || bvn !== null) {
    document.querySelector('#bankName').value = name;
    document.querySelector('#accNumber').value = accnumber;
    document.querySelector('#accType').value = acctype;
    document.querySelector('#accName').value = accname;
    document.querySelector('#bvn').value = bvn;
    document.querySelector('#saveBankDetails').classList.add('disabled');
    document.getElementById('saveBankDetails').disabled = true;
  }
};

export default displayBankDetails;
