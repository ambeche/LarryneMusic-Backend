'use strict';

import Product from '../models/Product.js';
import { uploadToCloudinary} from '../utils/cloudinary.js';

export default {
  Mutation: {
    uploadFilesOfProduct: async (root, { files }) => {
      console.log('file', files);
      try {
        const { createReadStream, filename, mimetype, encoding } = await files;
       // streams file data to cloud storage and returns url to the file; the url is then saved to mongoDB
        const uploadResponse = await uploadToCloudinary(createReadStream, filename);
        
        console.log(`files: ${filename}`, uploadResponse.responsive_breakpoints[0].breakpoints);

        return { filename, mimetype, url: uploadResponse.secure_url };
      } catch (err) {
        console.log(`upload error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
