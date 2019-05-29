const displayAddress = (data) => {
  const street = document.getElementById('address');
  const state = document.getElementById('state');
  street.value = data.homeaddress;
  state.value = data.state;
};

export default displayAddress;
