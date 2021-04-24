'use strict';

import Product from '../models/Product.js';
import { uploadToCloudinaryAndMongoDB } from '../utils/cloudinary.js';

export default {
  Mutation: {
    uploadFilesOfProduct: async (root, { files }) => {
      console.log('file', files);
      try {
        const streamedFiles = await Promise.all(files);

        const uploadResponse = await Promise.all(
          streamedFiles.map((file) => {
            // streams file data to cloud storage and return file url
            // a new produt is created and saved in mongoDB with the returned file data
            return uploadToCloudinaryAndMongoDB(
              file.createReadStream,
              file.filename,
              file.mimetype
            );
          })
        );

        console.log(`files: `, uploadResponse);

        return uploadResponse.map((pdtImage) => {
          return { ...pdtImage.image, id: pdtImage._id };
        });
      } catch (err) {
        console.log(`upload error: ${err.message}`);
        throw new Error(err);
      }
    },
    modifyProduct: async (root, args) => {
      try {
        const pdt = await Product.findById(args.productId);
        // verify if product exist in db for the modification
        if (pdt) {
          return await Product.findOneAndUpdate(
            args.productId,
            { ...args },
            {
              new: true,
              omitUndefined: true,
              populate: {
                path: 'owner',
                path: 'comments',
                path: 'storeInfo',
                populate: { path: 'orders' }
              }
            }
          );
        }
      } catch (e) {
        console.log(`modify pdt error: ${e.message}`);
      }
    }
  }
};
