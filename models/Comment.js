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
        ref: 'Product'
      }
    ],
    commentedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ]
  },
  { timestamps: true }
);

// arrow function not used : it prevents 'this' from binding
commentSchema.statics.findSortAndPopulateComment = async function (filter, sort) {
  // Comment Model helper function for finding product by params, populating and sorting them
  // default sorting is by date
  const sortby = sort ? sort : '-createdAt';

  if (filter._id)
    return await this.findById(filter)
      .populate('commentedComments')
      .populate({ path: 'author', select: '-_id -password -email' }) // excludes users credentials from circulation
      .populate('commentedProducts')
      .populate('comments');

  return await this.find(filter)
    .populate({ path: 'author', select: '-_id -password -email' })
    .populate('commentedProducts')
    .populate('comments')
    .populate('commentedComments')
    .sort(`${sortby}`);
};

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Date object is transformed to string since the Date type
    // is not a valid GraphQl Type
    // the date string will be retransformed to Date in the frontend
    //  new Date("1619379767698")
    returnedObject.createdAt = returnedObject.createdAt.toString();
  }
});

export default mongoose.model('Comment', commentSchema);
