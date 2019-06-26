import updateUserImage from './updateUserImg';

const imgUpdate = (file, token, userId) => {
  console.log('update image in cloudinary and server');
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/pomile/image/upload';
  const imagePreview = document.querySelector('#imagePreview');
  const fileUpload = document.querySelector('#fileUpload');
  fileUpload.addEventListener('change', () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('public_id', userId);
      console.log(formData);
      fetch(CLOUDINARY_URL, {
        method: 'PATCH',
        body: formData,
      }).then(res => res.json()).then((res) => {
        console.log(res);
        imagePreview.src = res.secure_url;
        if (res.status === 200) {
          updateUserImage(res.data.secure_url, token, userId);
        }
      }).catch(err => console.log(err));
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

export default imgUpdate;
