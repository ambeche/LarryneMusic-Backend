'use strict';
import {v2 as cloudinary, v2} from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})



const uploadToCloudinary = (createReadStream, filename) => {
  return new Promise((resolve, reject) => {
    const cloudinaryUploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
        public_id: path.parse(filename).name, // trims extension from filename and pass as public id
        folder: 'larryneMusic'
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
}

export  {cloudinary, uploadToCloudinary};