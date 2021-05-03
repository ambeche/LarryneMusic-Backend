'use strict';

import mongoose from 'mongoose';
import config from '../utils/config.js';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String, required: true, minLength: 8 },
  fullname: { type: String, required: true, minLength: 3 },
  role: {
    // role is used to set authorization and restrictions
    type: String,
    enum: [config.ROLE_USER, config.ROLE_ADMIN],
    default: config.ROLE_USER
  },
  roleValue: {
    type: String,
    default: function () {
      if (this.role === config.ROLE_ADMIN) return config.ROLE_ADMIN;
    }
  },
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
    .populate('orders')
    .populate('profileImage');
};

export default mongoose.model('User', userSchema);
