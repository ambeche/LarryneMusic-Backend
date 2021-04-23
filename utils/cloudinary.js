'use strict';
import config from '../utils/config.js';
import { v2 as cloudinary, v2 } from 'cloudinary';
import path from 'path';

v2.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = (createReadStream, filename) => {
  return new Promise((resolve, reject) => {
    const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          // trims extension from filename and pass as public id
          public_id: path.parse(filename).name,
          folder: 'larryneMusic',
          responsive_breakpoints: [
            {
              create_derived: true,
              bytes_step: 20000,
              min_width: 200,
              max_width: 1000,
              max_images: 20,
              transformation: {
                crop: 'fill',
                gravity: 'auto',
              },
            },
          ],
        },
        (error, result) => {
          console.log('streaming', result);
          if (error) {
            reject(error);
            console.log('file error', error);
          }
          resolve(result);
        }
    );

    createReadStream().pipe(cloudinaryUploadStream);
  });
};

export { cloudinary, uploadToCloudinary };
