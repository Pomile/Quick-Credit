const imagePreview = document.querySelector('#imagePreview');
const fileUpload = document.querySelector('#fileUpload');
const imgUpload = () => {
  fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    console.log(file);
  });
};

export default imgUpload;
