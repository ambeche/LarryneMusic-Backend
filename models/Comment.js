'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {type: String, required: true},
  likes: Number,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  // Comment can have comments
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
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
{ timestamps: true}
);

export default mongoose.model('Comment', commentSchema);
