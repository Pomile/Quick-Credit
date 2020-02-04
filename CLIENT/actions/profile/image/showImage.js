const displayImage = (data) => {
  const display = document.getElementById('spinnerBg');
  const imgProfile1 = document.getElementById('userImage');
  const imgProfile3 = document.getElementById('userImage2');
  const imgProfile2 = document.getElementById('output');
  imgProfile1.src = data.image;
  imgProfile2.src = data.image;
  imgProfile3.src = data.image;
  alert('Image uploaded');
};

export default displayImage;
