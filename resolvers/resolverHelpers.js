'use strict';
import Comment from '../models/Comment.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const findSortAndPopulateProduct = async (filter, sort, max) => {
  // Product model helper function for finding product by params, populating and sorting them.
  const sortby = sort ? sort : '';
  const limit = max && max < 11 ? max : max > 10 ? 10 : null;

  if (filter._id)
    return await Product.findById(filter).populate({
      path: 'owner',
      path: 'comments'
    });

  return await Product.find({ ...filter })
    .populate({
      path: 'owner',
      path: 'comments'
    })
    .sort(`${sortby}`)
    .limit(limit);
};

const findSortAndPopulateComment = async (filter, sort) => {
  // Comment Model helper function for finding product by params, populating and sorting them
  // default sorting is by date
  const sortby = sort ? sort : '-createdAt';

  if (filter._id)
    return await Comment.findById(filter).populate({
      path: 'author',
      path: 'comments',
      path: 'commentedProducts',
      path: 'commentedComments'
    });

  return await Comment.find({ ...filter })
    .populate({
      path: 'author',
      path: 'comments',
      path: 'commentedProducts',
      path: 'commentedComments'
    })
    .sort(`${sortby}`);
};

const findByIdAndPopulateUser = async (id) => {
  // User Model helper function for finding user by id and populating associated paths
  return await User.findById(id).populate({
    path: 'author',
    path: 'comments',
    path: 'commentedProducts',
    path: 'commentedComments'
  });
};

const toDateString = (date) => date.toString();

export {
  findSortAndPopulateProduct,
  findSortAndPopulateComment,
  findByIdAndPopulateUser,
  toDateString,
};
