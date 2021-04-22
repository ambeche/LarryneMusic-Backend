'use strict';

import Product from '../models/Product.js';

export default {
  Mutation: {
    uploadFilesOfProduct: async (root, { files }) => {
      console.log('file', files);
      try {
        const { createReadStream, filename, mimetype, encoding } = await files;

        console.log(`file: ${filename}`, mimetype, encoding);

        return { filename, mimetype, encoding };
      } catch (err) {
        console.log(`add user error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
