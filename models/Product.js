'use strict';

import mongoose from 'mongoose';
import path from 'path';
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    image: {
      publicId: String, // public_id from Cloudinary service
      url: { type: String, required: true },
      mimetype: { type: String, required: true },
      filename: String,
      // different sizes of the images to support responsive image display
      responsiveBreakpoints: [String]
    },
    title: {
      type: String,
      default: function () {
        return path.parse(this.image.filename).name;
      }
    },
    description: String,
    published: { type: Boolean, default: false },
    tag: {
      type: String,
      enum: ['photo', 'video', 'profile', 'store', 'music, logo'],
      default: 'photo'
    },
    // determines what product is placed at the top of the page
    priority: { type: Number, enum: [0, 1, 2], default: 2 },
    deleted: { type: Boolean, default: false },
    storeInfo: {
      price: Number,
      available: Boolean,
      quantitySold: Number,
      orderOrPreorder: {
        type: String,
        enum: ['order', 'preorder'],
        default: 'order'
      },
      orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
      deliveryType: { type: String, enum: ['download', 'shipping'] }
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    numberOfComments: {
      type: Number,
      get: function () { this.comments.reduce( (a,b) => a + b, 0)}
    },
    likes: {
      type: Number, default: 0,
    } 
  },
  { timestamps: true } 
);

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Date object is transformed to string since the Date type
    // is not a valid GraphQl Type
    //  e.g: new Date(1619379767698)
    returnedObject.createdAt = returnedObject.createdAt.toString();
    returnedObject.updatedAt = returnedObject.updatedAt.toString();
  }
});

// arrow function was not used because it prevents the binding of 'this'
productSchema.statics.findSortAndPopulateProduct = async function (
  filter,
  sort,
  max
) {
  // Product model helper function for finding product by params, populating and sorting them.
  const sortby = sort ? sort : '-createdAt';
  const limit = max && max < 11 ? max : max > 10 ? 10 : null;

  if (filter._id)
    return await this.findById(filter)
      .populate({ path: 'author', select: '-_id -password -email -role' }) // populates but protects users id and password from circulation
      .populate('commentedProducts')
      .populate('comments')
      .populate('commentedComments');

  return await this.find({ ...filter }) // only query docs with defined description
    .populate({ path: 'author', select: '-_id -password -email -role' })
    .populate('commentedProducts')
    .populate('comments')
    .populate('commentedComments')
    .sort(`${sortby}`)
    .limit(limit);
};

export default mongoose.model('Product', productSchema);
