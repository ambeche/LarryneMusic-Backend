'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, unique: true},
  password: {type: String, required: true},
  fullName: {type: String, required: true},
  role: {type: String, enum: ['fan', 'admin'], default: 'fan'},
  subscribed: Boolean,
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    region: String,
    country: String,
  },
  profileImage: {type: Schema.Types.ObjectId, ref: 'Product'},
  orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  liked: [
    {
      type: Schema.Types.ObjectId,
      // checks the Collection to be referenced from the path 'itemType'
      refPath: 'itemLike',
    },
  ],
  itemType: {
    // specifies the item that was liked
    type: String,
    required: true,
    enum: ['Product', 'Comment'],
  },
});

export default mongoose.model('User', userSchema);
