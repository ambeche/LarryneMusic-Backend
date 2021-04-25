'use strict';

import Product from '../models/Product.js';
import Comment from '../models/Comment.js';
import { uploadToCloudinaryAndMongoDB } from '../utils/cloudinary.js';
import User from '../models/User.js';
import {findSortAndPopulateProduct} from '../resolvers/resolverHelpers.js';

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
        if (pdt._id) {
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
    },

    deleteProduct: async (root, args) => {
      try {
        const pdtToDelete = await Product.findById(args.productId);
        //  when a product is deleted, all the Comment and likes associated
        // with the product are deleted as well
        // and the product id is removed from the asociated author of the product.
        if (pdtToDelete._id) {
          // delete accociated comments
          await Promise.all(
            pdtToDelete.comments.map((id) => {
              Comment.findByIdAndDelete(id);
            })
          );

          // dissociate author from deleted product and update User
          const author = await User.findById(pdtToDelete.owner);
          author.likedProducts = author.likedProducts.filter(
            (pdt) => String(pdt) !== String(pdtToDelete._id)
          );
          await author.save();

          await Product.findByIdAndDelete(args.productId);

          return `Successfully deleted ${pdtToDelete.title} with all its accociated likes and comments`;
        }
      } catch (e) {
        console.log(`modify pdt error: ${e.message}`);
      }
    }
  },

  Query: {
    products: async (root, args) => {
      // returned products are filtered and/or sorted and limited based on query params passed.
    
      try {
        if (args.tag) {
           return await findSortAndPopulateProduct({ tag: args.tag }, args.sortby, args.max);
        } else if (args.priority)
          return await findSortAndPopulateProduct({ priority: args.priority }, args.sortby, args.max);
    

        return findSortAndPopulateProduct({}, args.sortby, args.max);
      } catch (e) {
        console.log(`get pdt error: ${e.message}`);
      }
    },
    product: async (root, args) => {
      // query product by id
      try {
         return findSortAndPopulateProduct({_id: args.id});
      } catch (e) {
        console.log(`get pdt error: ${e.message}`);
      }
    }
  }
};
