import updateUserImage from './updateUserImg';


const imgUpload = () => {
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/pomile/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'zftr9pdr';
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const fileUpload = document.querySelector('#fileUpload');
  const imagePreview = document.querySelector('#imagePreview');
  fileUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      }).then(res => res.json()).then((res) => {
        imagePreview.src = res.secure_url;
        if (res.secure_url) {
          updateUserImage(res.secure_url, token, userId);
        }
      }).catch((err) => {
        document.getElementById('msg').innerHTML = err.message;
        open('backdrop2', 'errorBox');
      });
    }
  });
  //   axios({
  //     method: 'POST',
  //     url: CLOUDINARY_URL,
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     data: formData,
  //   }).then((res) => {
  //     console.log(res.data);
  //     imagePreview.src = res.data.secure_url;
  //   }).catch((err) => { console.log(err); });
  // });
};

export default imgUpload;
