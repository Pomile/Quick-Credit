

const capitalizeFirstLetter = (name) => {
  const firstLetter = name[0].toUpperCase();
  const arr = name.split('');
  const len = arr.length;
  const otherLetters = arr.slice(1, len).join('');
  const newWord = firstLetter + otherLetters;
  return newWord;
};

const capitalizeWords = (string) => {
  if (string.includes(' ')) {
    const splitName = string.split(' ');
    const formatedString = [];
    splitName.forEach((name) => {
      if (name !== '') {
        const newname = capitalizeFirstLetter(name);
        formatedString.push(newname);
      }
    });

    return formatedString.join(' ');
  }

  return capitalizeFirstLetter(string);
};


export default capitalizeWords;
