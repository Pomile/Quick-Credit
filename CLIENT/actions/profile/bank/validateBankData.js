const validateBankDetails = (data) => {
  let isValid = true;
  const {
    name, accNumber, accName, bvn,
  } = data;
  const bankName = document.getElementById('bankName');
  const accNum = document.getElementById('accountNum');
  const accNm = document.getElementById('accountName');
  const bv = document.getElementById('bvn');

  if (name === '' || name.length < 5) {
    isValid = false;
    bankName.style.border = '1px solid red';
  } else {
    bankName.style.border = 'none';
  }
  if (accName === '' || accName.length < 5) {
    isValid = false;
    accNm.style.border = '1px solid red';
  } else {
    accNm.style.border = 'none';
  }

  if (Number.isNaN(accNumber)) {
    isValid = false;
    accNum.style.border = '1px solid red';
  } else {
    accNum.style.border = 'none';
  }

  if (Number.isNaN(bvn)) {
    isValid = false;
    bv.style.border = '1px solid red';
  } else {
    bv.style.border = 'none';
  }
  return {
    isValid,
  };
};

export default validateBankDetails;
