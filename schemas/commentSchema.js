'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    comments(dateRange: DateRangeInput, sortby: String): [Comment]
    comment(id: ID!): Comment
  }

  extend type Mutation {
    createComment(content: String!, commentedItem: CommentItemInput!): Comment

    modifyComment(id: ID!, content: String, likes: Int): Comment!

    deleteComment(id: ID!): String
  }

  type Comment {
    id: ID
    content: String
    likes: Int
    author: User
    createdAt: String
    updatedAt: String
    comments: [Comment]
    commentedProducts: [Product]
    commentedComments: [Comment]
  }

  input CommentItemInput {
    commentedProductId: ID
    commentedCommentId: ID
  }

  input DateRangeInput {
    earlier: String!
    later: String!
  }
`;
