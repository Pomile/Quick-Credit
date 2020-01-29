import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class Cloudinary {
  static uploadImage(imagePath, callback) {
    cloudinary.v2.uploader.upload(imagePath,
      {
        unique_filename: false,
        use_filename: true,
        invalidate: true,
        folder: 'quick_credit/',
        transformation: [
          {
            width: 200, height: 200, crop: 'fit',
          }],
      },
      (error, result) => {
        if (error) {
          callback(error);
        } else {
          callback(null, result);
        }
      });
  }
}

export default Cloudinary;
