'use strict';
import Product from '../models/Product.js';

const findAndPopulateProduct = async (filter, sort, max) => {
  // product helper function for finding product by params, populating and sorting them.
  const sortby = sort ? sort : '';
  const limit = max && max < 11 ? max : max > 10 ? 10 : null;

  if (filter._id) return await Product.findById(filter);

  return await Product.find({ ...filter })
    .populate({
      path: 'owner',
      path: 'comments'
    })
    .sort(`${sortby}`)
    .limit(limit);
};

export { findAndPopulateProduct };
