const displayAddress = (data) => {
  const street = document.getElementById('street');
  const state = document.getElementById('state');
  street.value = data.homeaddress;
  state.value = data.state;
};

export default displayAddress;
