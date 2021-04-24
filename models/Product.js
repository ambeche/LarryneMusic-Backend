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

export default mongoose.model('Product', productSchema);
