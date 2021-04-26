'use strict';

import Comment from '../models/Comment.js';
import User from '../models/User.js';
import {
  findSortAndPopulateComment,
  dateValidator
} from '../resolvers/resolverHelpers.js';

export default {
  Mutation: {
    createComment: async (root, args) => {
      try {
        const { content, commentedItem } = args;
        console.log('cmt', content);
        const newComment = Comment({
          content,
          commentedProducts: [commentedItem.commentedid],
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
    },
    deleteComment: async (root, args) => {
      try {
        const cmtToDelete = await Comment.findById(args.id);
        const author = await User.findById(user.id);
        // comment can only be deleted by it's authenticated author
        // when a comment is deleted, all the comments and likes associated
        // with it are deleted as well
        // and the deleted comment id dissociated from products and users.
        if (cmtToDelete._id && String(user.id) === String(cmtToDelete.author)) {
          // delete associated comments
          await Promise.all(
            cmtToDelete.comments?.map((id) => {
              Comment.findByIdAndDelete(id);
            })
          );

          // remove deleted comment id from the associated authors comment lists
          // and update User
          author.comments = author.comments.filter(
            (cmtId) => String(cmtId) !== String(cmtToDelete._id)
          );

          author.likedComments = author.likedProducts?.filter(
            (cmt) => String(cmt) !== String(cmtToDelete._id)
          );
          await author.save();

          // delete the comment
          await Comment.findByIdAndDelete(args.id);

          return `comment deleted successfully!`;
        }
      } catch (e) {
        console.log(`delete cmt error: ${e.message}`);
      }
    }
  },

  Query: {
    comments: async (root, args) => {
      // returned comments are filtered by date range and/or sorted based on query params passed.
      // defalult sorting is by date in decending order

      try {
        if (args.dateRange) {
          const dateRange = dateValidator(args.dateRange);

          if (dateRange) {
            return await findSortAndPopulateComment(
              { createdAt: { $gte: dateRange.first, $lte: dateRange.last } },
              args.sortby
            );
          }
        }

        return findSortAndPopulateComment({}, args.sortby);
      } catch (e) {
        console.log(`get cmts error: ${e.message}`);
      }
    },
    comment: async (root, args) => {
      // query comment by id
      try {
        return findSortAndPopulateComment({ _id: args.id });
      } catch (e) {
        console.log(`get cmt error: ${e.message}`);
      }
    }
  }
};
