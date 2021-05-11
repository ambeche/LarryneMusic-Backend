'use strict';
import config from '../utils/config.js';
import { v2 as cloudinary, v2 } from 'cloudinary';
import Product from '../models/Product.js';
import path from 'path';

v2.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadToCloudinaryAndMongoDB = (createReadStream, filename, mimetype) => {
  return new Promise((resolve, reject) => {
    // creates an upload stream to Cloudinary storage
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
          console.log(
              'streaming', result.responsive_breakpoints[0].breakpoints);
          if (error) {
            console.log('file upload error', error);
            reject(error);
          }
          // response from Cloudinary API is then saved in db as Product.image
          const imageToMongoDb = new Product({
            image: {
              publicId: result.public_id,
              url: result.secure_url,
              height: result.height,
              width: result.width,
              size: result.bytes,
              responsiveBreakpoints: result.responsive_breakpoints[0]
                  .breakpoints
                  .map(
                      (img) => img.secure_url
                  ),
              filename,
              mimetype,
            },
          }).save();
          resolve(imageToMongoDb);
        }
    );
    // pipes the files stream to Cloudinary Storage
    createReadStream().pipe(cloudinaryUploadStream);
  });
};

export { cloudinary, uploadToCloudinaryAndMongoDB };
