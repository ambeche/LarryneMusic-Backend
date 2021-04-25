'use strict';

import Comment from '../models/Comment.js';
import {
  findSortAndPopulateProduct,
  findByIdAndPopulateUser,
  findSortAndPopulateComment
} from '../resolvers/resolverHelpers.js';

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

        // date property is converted to string before returned as graphql schema type has no Date
        const cAuthor = await findByIdAndPopulateUser(
          '6084fa684223de1bc44216ec'
        );
        createdComment.author = cAuthor;
        // the populated path is determined by the kind of item that was commented
        if (commentedItem.commentedProductId) {
          const pdt = await findSortAndPopulateProduct({
            _id: commentedItem.commentedProductId
          });
          createdComment.commentedProducts = [pdt];

          return createdComment;
        }

        const comment = await findSortAndPopulateComment({
          _id: commentedItem.commentedCommentId
        });

        createdComment.commentedComments = [comment];
        console.log('cmt', createdComment);

        return createdComment;
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
          // console.log('update', toBeUpdated);

          return toBeUpdated;
        }
      } catch (err) {
        console.log(`modify comment error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
