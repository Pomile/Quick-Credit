const formatCardNumber = () => {
  const cardNumInput = document.getElementById('cardnumber');
  const { value } = cardNumInput;
  const numLength = value.length;
  const spaceIndex = [];
  if (numLength === 5 || numLength === 10 || numLength === 15) {
    cardNumInput.value = cardNumInput.value.split('').slice(0, numLength - 1).join('');
  }
  if (numLength === 4 || numLength === 9 || numLength === 14) {
    spaceIndex.push(numLength + 1);
    cardNumInput.value += ' ';
  }
  if (numLength > 19 || numLength <= 0) {
    cardNumInput.style.color = 'red';
  } else {
    cardNumInput.style.color = 'gray';
  }
};

export default formatCardNumber;
