'use strict';

import Product from '../models/Product.js';
import { uploadToCloudinary} from '../utils/cloudinary.js';

export default {
  Mutation: {
    uploadFilesOfProduct: async (root, { files }) => {
      console.log('file', files);
      try {
        const streamedFiles = await Promise.all(files);

       const uploadResponse = await Promise.all ( streamedFiles.map( file => {
        // streams file data to cloud storage and returns url to the file; the url is then saved to mongoDB
         return uploadToCloudinary(file.createReadStream, file.filename);
       }));
        
       console.log(`files: `, uploadResponse);
       console.log(`file1: `, uploadResponse[0].responsive_breakpoints[0].breakpoints);

        return  [{public_id: uploadResponse[2].public_id}] ;
      } catch (err) {
        console.log(`upload error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
