const displayBankDetails = (data) => {
  const {
    name, accname, accnumber, bvn,
  } = data;
  if (name !== null || accnumber !== null || bvn !== null) {
    document.querySelector('#bankName').value = name;
    document.querySelector('#accountNum').value = accnumber;
    document.querySelector('#accountName').value = accname;
    document.querySelector('#bvn').value = bvn;
  }
};

export default displayBankDetails;
