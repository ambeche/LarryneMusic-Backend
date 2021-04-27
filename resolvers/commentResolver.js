'use strict';

import Comment from '../models/Comment.js';
import User from '../models/User.js';
import { dateValidator, verifyUser } from '../resolvers/resolverHelpers.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Mutation: {
    // only authenticated users can create or modify comments
    createComment: async (root, args, { user }) => {
      verifyUser(user); // throws authentication error if user is not authenticated
      try {
        const { content, commentedItem } = args;
        console.log('cmt', content);
        const newComment = Comment({
          content,
          commentedProducts: [commentedItem.commentedid],
          commentedComments: [commentedItem.commentedCommentId],
          author: user._id
        });
        const createdComment = await newComment.save();

        // finds the newly created comment by id, populates all its associated fields
        // and excludes user's credentials from the returned value.
        const resolvedComment = await Comment.findSortAndPopulateComment({
          _id: createdComment._id
        });

        return resolvedComment;
      } catch (err) {
        console.log(`add comment error: ${err.message}`);
      }
    },

    modifyComment: async (root, args, { user }) => {
      verifyUser(user); // throws Authentication error if not valid
      const toBeUpdated = await Comment.findById({
        _id: args.id
      });
      // only an authenticated user and auhor of a comment can edit comment
      if (String(toBeUpdated.author) === String(user._id)) {
        try {
          // updates applied
          toBeUpdated.likes = args.likes;
          toBeUpdated.content = args.content;
          await toBeUpdated.save();

          return await Comment.findSortAndPopulateComment({
            _id: toBeUpdated._id
          });
        } catch (err) {
          console.log(`modify comment error: ${err.message}`);
        }
      }
      throw new AuthenticationError('Not Authorized; Access Denied!');
    },
    deleteComment: async (root, args, { user }) => {
      verifyUser(user);
      try {
        const cmtToDelete = await Comment.findById(args.id);
        const author = await User.findById(user._id);
        // comment can only be deleted by it's authenticated author
        // when a comment is deleted, all the comments and likes associated
        // with it are deleted as well
        // and the deleted comment id dissociated from products and users.
        if (
          cmtToDelete &&
          cmtToDelete._id &&
          String(user._id) === String(cmtToDelete.author)
        ) {
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
        throw new AuthenticationError('Not Authorized; Access Denied!');
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
            return await Comment.findSortAndPopulateComment(
              { createdAt: { $gte: dateRange.first, $lte: dateRange.last } },
              args.sortby
            );
          }
        }

        return Comment.findSortAndPopulateComment({}, args.sortby);
      } catch (e) {
        console.log(`get cmts error: ${e.message}`);
      }
    },
    comment: async (root, args) => {
      // query comment by id
      try {
        return Comment.findSortAndPopulateComment({ _id: args.id });
      } catch (e) {
        console.log(`get cmt error: ${e.message}`);
      }
    }
  }
};
