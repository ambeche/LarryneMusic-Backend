'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    getComments: [Comment]
    getComment(id: ID!): Comment
  }

  extend type Mutation {
    createComment(content: String!, commentedItem: CommentItemInput!): Comment

    modifyComment(id: ID!, content: String, likes: Int): Comment

    deleteComment(id: ID!): String
  }

  type Comment {
    id: ID
    content: String
    likes: Int
    author: User
    createdAt: String!
    comments: [Comment]
    commentedProducts: [Product]
    commentedComments: [Comment]
  }

  input CommentItemInput {
    commentedProductId: ID
    commentedCommentId: ID
  }
`;
