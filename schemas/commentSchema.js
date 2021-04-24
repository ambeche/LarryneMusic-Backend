'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    comments: [Comment]
    comment(commentId: ID!): Comment
  }

  extend type Mutation {
    addComment(context: String!, commentedItemId: CommentItemInput!): Comment

    modifyComment(commentId: ID!, content: String, likes: Int): Comment

    deleteComment(commentId: ID!): String
  }

  type Comment {
    id: ID
    content: String
    likes: Int
    author: User
    comments: [Comment]
    commentedProducts: [Product]
    commentedComments: [Comment]
  }

  input CommentItemInput {
    commentedProductId: ID
    commentedCommentId: ID
  }
`;
