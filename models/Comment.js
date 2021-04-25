'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
      content: { type: String, required: true },
      likes: Number,
      author: { type: Schema.Types.ObjectId, ref: 'User' },
      // Comment can have comments
      comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
      // items commented on, Product or another comment
      commentedProducts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Product',
        },
      ],
      commentedComments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    },
    { timestamps: true }
);

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Date object is transformed to string since the Date type
    // is not a valid GraphQl Type
    // the date string will be retransformed to Date in the frontend
    //  new Date("1619379767698")
    returnedObject.createdAt = returnedObject.createdAt.toString();
  },
});

export default mongoose.model('Comment', commentSchema);
