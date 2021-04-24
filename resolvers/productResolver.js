'use strict';

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
            return uploadToCloudinaryAndMongoDB(file.createReadStream, file.filename, file.mimetype);
          })
        );

        console.log(`files: `, uploadResponse)

        return uploadResponse.map(pdtImage => {
          return {...pdtImage.image, id: pdtImage._id}
        })

      } catch (err) {
        console.log(`upload error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
