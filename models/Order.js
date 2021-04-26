'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    transactionType: { type: String, enum: ['Stripe', 'G Pay'] },
    delivered: Boolean,
    totalAmount: Number,
    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      region: String,
      country: String
    },
    deliveryDate: {
      type: Date,
      set: (date) => new Date(parseInt(date))
    },
    estimatedDateOfDelivery: {
      type: Date,
      set: (date) => new Date(parseInt(date))
    },
    transactionStatus: { type: String, enum: ['complete', 'processing'] },
    shippingDetails: String,
    orderedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    orderedProducts: [
      {
        quantity: Number,
        product: { type: Schema.Types.ObjectId, ref: 'Product' }
      }
    ]
  },
  { timestamps: { createdAt: 'orderedDate' } }
);

// arrow function not used because it prevents the binding of 'this'
orderSchema.statics.findSortAndPopulateOrder = async function (filter, sort) {
  // query and populate orders
  const sortby = sort ? sort : '-createdAt';

  if (filter._id)
    return await this.findById(filter)
      .populate({ path: 'orderedBy', select: '-_id -password -email' })
      .populate({
        path: 'orderedProducts',
        populate: [{ path: 'product' }]
      });

  return await this.find(filter)
    .populate({ path: 'orderedBy', select: '-_id -password -email' })
    .populate({
      path: 'orderedProducts',
      populate: [{ path: 'product' }]
    })
    .sort(`${sortby}`);
};

orderSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Date object is transformed to string since the Date type
    // is not a valid GraphQl Type
    // the date string will be retransformed to Date in the frontend
    //  e.g: new Date(1619379767698)
    returnedObject.orderedDate = returnedObject.orderedDate.toString();
    returnedObject.deliveryDate = returnedObject.deliveryDate.toString();
    returnedObject.estimatedDateOfDelivery = returnedObject.estimatedDateOfDelivery.toString();
  }
});

export default mongoose.model('Order', orderSchema);
