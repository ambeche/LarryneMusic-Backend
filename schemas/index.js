'use strict';
import {gql} from 'apollo-server-express';
import commentSchema from './commentSchema.js';
import orderSchema from './orderSchema.js';
import productSchema from './productSchema.js';
import userSchema from './userSchema.js';
import addressSchema from './addressSchema.js';

const root = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [
  root,
  productSchema,
  orderSchema,
  commentSchema,
  userSchema,
  addressSchema,
];
