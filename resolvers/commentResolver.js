'use strict';

import Comment from '../models/Comment.js';
import {
  findSortAndPopulateProduct,
  findByIdAndPopulateUser,
  findSortAndPopulateComment,
  toDateString
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
        const createdAt = toDateString(createdComment.createdAt);
        const cAuthor = await findByIdAndPopulateUser(
          '6084fa684223de1bc44216ec'
        );
        // the populated path is determined by the kind of item that was commented
        if (commentedItem.commentedProductId) {
          const pdt = await findSortAndPopulateProduct({
            _id: commentedItem.commentedProductId
          });

          console.log('cmt', createdComment);
          return {
            content: createdComment.content,
            commentedProducts: [pdt],
            author: cAuthor,
            createdAt: createdAt,
            id: createdComment._id,
          };
        }

        const comment = await findSortAndPopulateComment({
          _id: commentedItem.commentedCommentId
        });
        return {
          content: createdComment.content,
          commentedComments: [comment],
          author: cAuthor,
          createdAt: createdAt,
          id: createdComment._id,
        };
      } catch (err) {
        console.log(`add comment error: ${err.message}`);
        throw new Error(err);
      }
    },

    modifyComment: async (root, args) => {

      try {
      
        const toBeUpdated = await findSortAndPopulateComment({_id: args.id});
       
          // updates applied
          toBeUpdated.likes = args.likes;
          toBeUpdated.content = args.content;
          await toBeUpdated.save()
          console.log('update', toBeUpdated)
        
          return toBeUpdated
        

      } catch (err) {
        console.log(`modify comment error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
