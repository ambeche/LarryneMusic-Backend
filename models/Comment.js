'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {type: String, required: true},
  likes: Number,
  author: {type: Schema.Types.ObjectId, ref: 'User'},
  // Comment can have comments
  comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  commentedItems: [
    {
      type: Schema.Types.ObjectId,
      // checks the Collection to be referenced from the path 'itemType'
      // using mongoose dynamic referencing
      refPath: 'itemType',
    },
  ],
  itemType: {
    // specifies the item commented on
    type: String,
    required: true,
    enum: ['Product', 'Comment'],
  },
});

export default mongoose.model('Comment', commentSchema);
