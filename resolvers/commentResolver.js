'use strict';

import Comment from '../models/Comment.js';
import { findSortAndPopulateComment } from '../resolvers/resolverHelpers.js';

export default {
  Mutation: {
    createComment: async (root, args) => {
      try {
        const { content, commentedItem } = args;
        console.log('cmt', content);
        const newComment = Comment({
          content,
          commentedProducts: [commentedItem.commentedProductId],
          commentedComments: [commentedItem.commentedCommentId],
          author: '6084fa684223de1bc44216ec'
        });
        const createdComment = await newComment.save();

        // finds the newly created comment by id, populates all its associated fields
        // and excludes user's credentials from the returned value.
        const resolvedComment = await findSortAndPopulateComment({
          _id: createdComment._id
        });

        return resolvedComment;
      } catch (err) {
        console.log(`add comment error: ${err.message}`);
        throw new Error(err);
      }
    },

    modifyComment: async (root, args) => {
      try {
        const toBeUpdated = await findSortAndPopulateComment({ _id: args.id });
        // verifies document's existence before update is applied
        if (toBeUpdated) {
          // updates applied
          toBeUpdated.likes = args.likes;
          toBeUpdated.content = args.content;
          await toBeUpdated.save();

          console.log('update', toBeUpdated);

          return toBeUpdated;
        }
      } catch (err) {
        console.log(`modify comment error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
