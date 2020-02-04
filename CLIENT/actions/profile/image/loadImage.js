const loadImage = () => {
  const img = document.getElementById('output');
  img.src = URL.createObjectURL(event.target.files[0]);
};

export default loadImage;
