const displayAddress = (data) => {
  const { homeaddress, state } = data;
  if (homeaddress !== null || state !== null) {
    const street = document.getElementById('street');
    const stateInput = document.getElementById('state');
    street.value = homeaddress;
    stateInput.value = state;
    document.querySelector('#saveAddressBtn').classList.add('disabled');
    document.getElementById('saveAddressBtn').disabled = true;
  }
};

export default displayAddress;
