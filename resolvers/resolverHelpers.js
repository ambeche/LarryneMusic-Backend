'use strict';
// biolerplates for db queries

import Comment from '../models/Comment.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

const findSortAndPopulateProduct = async (filter, sort, max) => {
  // Product model helper function for finding product by params, populating and sorting them.
  const sortby = sort ? sort : '';
  const limit = max && max < 11 ? max : max > 10 ? 10 : null;

  if (filter._id)
    return await Product.findById(filter)
      .populate({ path: 'author', select: '-_id -password -email' }) // populates but protects users id and password from circulation
      .populate('commentedProducts')
      .populate('comments')
      .populate('commentedComments');

  return await Product.find({ ...filter })
    .populate({ path: 'author', select: '-_id -password -email' })
    .populate('commentedProducts')
    .populate('comments')
    .populate('commentedComments')
    .sort(`${sortby}`)
    .limit(limit);
};

const findSortAndPopulateComment = async (filter, sort) => {
  // Comment Model helper function for finding product by params, populating and sorting them
  // default sorting is by date
  const sortby = sort ? sort : '-createdAt';

  if (filter._id)
    return await Comment.findById(filter)
      .populate('commentedComments')
      .populate({ path: 'author', select: '-_id -password -email' }) // excludes users credentials from circulation
      .populate('commentedProducts')
      .populate('comments');

  return await Comment.find(filter)
    .populate({ path: 'author', select: '-_id -password -email' })
    .populate('commentedProducts')
    .populate('comments')
    .populate('commentedComments')
    .sort(`${sortby}`);
};

const findByIdAndPopulateUser = async (id, options) => {
  // User Model helper function for finding user by id and populating associated paths
  return await User.findById(id, { ...options })
    .populate('comments')
    .populate('likedProducts')
    .populate('likedComments')
    //.populate('orders')
    .populate('profileImage');
};

const findSortAndPopulateOrder = async (filter, sort) => {
  // query and populate orders
  const sortby = sort ? sort : '-createdAt';

  if (filter._id)
    return await Order.findById(filter)
      .populate({ path: 'orderedBy', select: '-_id -password -email' })
      .populate({
        path: 'orderedProducts',
        populate: [{ path: 'product' }]
      });

  return await Order.find(filter)
    .populate({ path: 'orderedBy', select: '-_id -password -email' })
    .populate({
      path: 'orderedProducts',
      populate: [{ path: 'product' }]
    })
    .sort(`${sortby}`);
};

// validate Date parameters
const dateValidator = ({ earlier, later }) => {
  const first = new Date(parseInt(earlier));
  const last = new Date(parseInt(later));
  if (
    last.getTime() > first.getTime() &&
    last.getTime() < new Date().getTime()
  ) {
    return { first, last };
  }
  return false;
};

export {
  findSortAndPopulateProduct,
  findSortAndPopulateComment,
  findByIdAndPopulateUser,
  findSortAndPopulateOrder,
  dateValidator
};
