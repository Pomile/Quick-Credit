import async from 'async';
import fs from 'fs';
import { response } from 'express';
import { Buffer } from 'buffer';
import Cloudinary from '../service/Cloudinary';

const decodeBase64Image = (image) => {
  const resp = {};
  resp.type = image.type;
  resp.data = Buffer.from(image);
  return resp;
};

export default function uploadImage(imgPath, image, cb) {
  // decodeBase64Image
  const imageBuffer = decodeBase64Image(image.buffer);
  async.waterfall(
    [
      // write image to disk
      function writeImage(callback) {
        fs.writeFile(imgPath, imageBuffer.data, (err) => {
          callback(err, imgPath);
        });
      },
      // upload image to cloudinary
      function upload(imgPath, callback) {
        Cloudinary.uploadImage(imgPath, callback);
      },

      // remove file from path
      function removeFile(result, callback) {
        fs.unlink(imgPath, (err) => {
          callback(err, result);
        });
      },

    ], (err, result) => {
      cb(err, result);
    },
  );
}
