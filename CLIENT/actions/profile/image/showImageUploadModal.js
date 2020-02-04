import ImageUploader from '../template/image';

const showImageUploader = () => {
  const temp = ImageUploader();
  const root = document.getElementById('root');
  root.insertAdjacentHTML('beforeend', temp);
  document.getElementById('imageUploadBackdrop').style.display = 'block';
};

export default showImageUploader;
