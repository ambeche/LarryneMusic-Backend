'use strict';

import Comment from '../models/Comment.js';
import {
  findSortAndPopulateProduct,
  findSortAndPopulateComment,
  findByIdAndPopulateUser,
  toDateString
} from '../resolvers/resolverHelpers.js';

export default {
  Mutation: {
    createComment: async (root, args) => {
      try {
        const { content, commentedItem } = args;
        console.log('cmt', content);
        const newComment = await Comment({
          content,
          commentedProducts: [commentedItem.commentedProductId],
          commentedComments: [commentedItem.commentedCommentId],
          author: '6084fa684223de1bc44216ec'
        }).save();
        // date property is converted to string before returned as graphql schema type has no Date
        const createdAt = toDateString(newComment.createdAt);
        const cAuthor = await findByIdAndPopulateUser(
          '6084fa684223de1bc44216ec'
        );
        // the populated path is determined by the kind of item that was commented
        if (commentedItem.commentedProductId) {
          const pdt = await findSortAndPopulateProduct({
            _id: commentedItem.commentedProductId
          });

          console.log('cmt', newComment);
          return {
            ...newComment,
            commentedProducts: [pdt],
            author: cAuthor,
            createdAt: createdAt
          };
        }

        const comment = await findSortAndPopulateComment({
          _id: commentedItem.commentedCommentId
        });
        return {
          ...newComment,
          commentedComments: [comment],
          author: cAuthor,
          createdAt: createdAt
        };
      } catch (err) {
        console.log(`add comment error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
