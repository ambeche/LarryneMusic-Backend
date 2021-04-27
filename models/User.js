'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  role: { type: String, enum: ['fan', 'admin'], default: 'fan' },
  subscribed: Boolean,
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    region: String,
    country: String
  },
  profileImage: { type: Schema.Types.ObjectId, ref: 'Product' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  likedProducts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  likedComments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

// 'this' required, hence the preference over arrow function
userSchema.statics.findByIdAndPopulateUser = async function (id, options) {
  // User Model helper function for finding user by id and populating associated paths
  return await this.findById(id, { ...options })
    .populate('comments')
    .populate('likedProducts')
    .populate('likedComments')
    //.populate('orders')
    .populate('profileImage');
};

export default mongoose.model('User', userSchema);
