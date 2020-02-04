import baseUrl from '../../../route/endpointPath';
import displayImage from './showImage';

const saveImage = () => {
  const userId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  const file = document.getElementById('file').files[0];
  const spinner = document.getElementById('spinnerBg');
  if (file !== null) {
    spinner.style.display = 'block';
    const h = new Headers();
    h.append('Accept', 'application/json');
    h.append('authorization', token);
    const formData = new FormData();
    formData.append('file', file);
    fetch(`${baseUrl}/users/${userId}/profile/image`, {
      method: 'post',
      headers: h,
      body: formData,
    }).then(res => res.json()).then((data) => {
      if (data.error) {
        spinner.style.display = 'none';
        throw data.error;
      }
      spinner.style.display = 'none';
      displayImage(data.data);
      localStorage.setItem('image', data.data.image);
    }).catch((error) => {
      alert('Ooops something went wrong. please try again');
    });
  }
};

export default saveImage;
