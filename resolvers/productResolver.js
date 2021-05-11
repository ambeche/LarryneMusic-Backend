'use strict';

import Product from '../models/Product.js';
import Comment from '../models/Comment.js';
import { uploadToCloudinaryAndMongoDB } from '../utils/cloudinary.js';
import User from '../models/User.js';
import { verifyAdminAccess, verifyUser } from './resolverHelpers.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Mutation: {
    // file uploads and product mutations are allowed only for admin user,
    // normal users have only read access to products
    uploadFilesOfProduct: async (root, { files }, { user }) => {
      if (await verifyAdminAccess(user)) {
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

          //console.log(`files: `, uploadResponse);
          // populates, sort and return a list of the newly created products and theier images.
          return await Promise.all(uploadResponse.map((pdtImage) => {
            return Product.findSortAndPopulateProduct({_id:pdtImage._id})
          }))
        } catch (err) {
          console.log(`upload error: ${err.message}`);
          throw new Error(err);
        }
      }
      throw new AuthenticationError('Not Authorized; Access Denied!');
    },

    modifyProduct: async (root, args, { user }) => {
      if (await verifyUser(user)) {
        try {
          const pdt = await Product.findById(args.id);

          // verify if product exist in db for the modification
          if (pdt._id) {
            const updatedPdt = await Product.findByIdAndUpdate(
              args.id,
              args,
              {
                new: true
              }
            );
            console.log('pub', pdt);

            console.log('modified', updatedPdt);

            // populate associated fields and return pdt
            return Product.findSortAndPopulateProduct({ _id: updatedPdt._id });
          }
        } catch (e) {
          console.log(`modify pdt error: ${e.message}`);
        }
      }
      throw new AuthenticationError('Not Authorized; Access Denied!');
    },

    deleteProduct: async (root, args, { user }) => {
      if (await verifyAdminAccess(user)) {
        try {
          const pdtToDelete = await Product.findById(args.id);
          //  when a product is deleted, all the Comment and likes associated
          // with the product are deleted as well
          // and the product id is removed from the asociated author of the product.
          if (pdtToDelete?._id) {
            // delete accociated comments
            await Promise.all(
              pdtToDelete.comments.map((id) => {
                Comment.findByIdAndDelete(id);
              })
            );

            // dissociate author from deleted product and update User
            const author = await User.findById(pdtToDelete.owner);
            if (author) {
              author.likedProducts = author.likedProducts?.filter(
                (pdt) => String(pdt) !== String(pdtToDelete._id)
              );
              await author.save();
            }

            await Product.findByIdAndDelete(args.id);

            return `Successfully deleted ${pdtToDelete.title} with all its accociated likes and comments`;
          }
        } catch (e) {
          console.log(`delete pdt error: ${e.message}`);
        }
      }
      throw new AuthenticationError('Not Authorized; Access Denied!');
    }
  },

  Query: {
    products: async (root, args) => {
      // returned products are filtered and/or sorted and limited based on query params passed
      // using a custom instance method

      try {
        if (args.tag) {
          return await Product.findSortAndPopulateProduct(
            { tag: args.tag ,  'published': true},
            args.sortby,
            args.max
          ); // search by priority
        } else if (args.priority)
          return await Product.findSortAndPopulateProduct(
            { priority: args.priority },
            args.sortby,
            args.max
          );
        // search by user defined filter
        else if (args.filter) {
          
          return await Product.findSortAndPopulateProduct(
            { [args.filter.key]: args.filter.value },
            args.sortby,
            args.max
          );
        }

        return Product.findSortAndPopulateProduct({}, args.sortby, args.max);
      } catch (e) {
        console.log(`get pdt error: ${e.message}`);
      }
    },
    product: async (root, args) => {
      // query product by id
      try {
        return Product.findSortAndPopulateProduct({ _id: args.id });
      } catch (e) {
        console.log(`get pdt error: ${e.message}`);
      }
    }
  }
};
