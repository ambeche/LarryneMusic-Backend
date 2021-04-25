'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  transactionType: {type: String, enum: ['PayPal', 'G Pay']},
  deliveryStatus: Boolean,
  quantity: Number,
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    region: String,
    country: String,
  },
  deliveryDate: Date,
  estimatedDateOfDelivery: Date,
  transactionStatus: {type: String, enum: ['complete', 'processing']},
  shippingDetails: String,
  orderedBy: {type: Schema.Types.ObjectId, ref: 'User'},
  products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
},
{ timestamps: { createdAt: 'orderedDate' } }
);

export default mongoose.model('Order', orderSchema);
