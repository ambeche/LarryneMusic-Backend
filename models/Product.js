'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  image: {
    publicId: String, // public_id from Cloudinary service
    url: { type: String, required: true },
    mimetype: { type: String, required: true },
    filename: String,
    // different sizes of the images to support responsive image display
    responsiveBreakpoints: [String],
  },
  title: String,
  description: String,
  tag: {
    type: String,
    enum: ['photo', 'video', 'profile', 'store', 'music, logo'],
    default: 'photo',
  },
  // determines what product is placed at the top of the page
  priority: { type: Number, enum: [0, 1, 2], default: 2},
  deleted: {type: Boolean, default: false},
  storeInfo: {
    price: Number,
    availability: Boolean,
    quantitySold: Number,
    orderOrPreorder: {
      type: String,
      enum: ['order', 'preorder'],
      default: 'order',
    },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    deliveryType: { type: String, enum: ['download', 'shipping'] },
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  likes: Number,
});

// arrow function was not used because it prevents the binding of 'this'
productSchema.statics.findSortAndPopulateProduct = async function (filter, sort, max) {
  // Product model helper function for finding product by params, populating and sorting them.
  const sortby = sort ? sort : '';
  const limit = max && max < 11 ? max : max > 10 ? 10 : null;

  if (filter._id)
    return await this.findById(filter)
      .populate({ path: 'author', select: '-_id -password -email' }) // populates but protects users id and password from circulation
      .populate('commentedProducts')
      .populate('comments')
      .populate('commentedComments');

  return await this.find({ ...filter })
    .populate({ path: 'author', select: '-_id -password -email' })
    .populate('commentedProducts')
    .populate('comments')
    .populate('commentedComments')
    .sort(`${sortby}`)
    .limit(limit);
};

export default mongoose.model('Product', productSchema);
