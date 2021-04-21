'use strict';
import {gql} from 'apollo-server-express';

const root = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [root];
