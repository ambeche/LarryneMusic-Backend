'use strict';

import {gql} from 'apollo-server-express';

export default gql`
  extend type Query {
    user: User
    login(email: String!, password: String!): User
  }

  extend type Mutation {
    registerUser(email: String!, password: String!, fullname: String): User

    modifyUser(fullname: String, shippingAddress: ShippingAddressInput): User
  }

  type User {
    id: ID
    email: String
    fullname: String
    role: String
    subscribed: Boolean
    shippingAddress: ShippingAddress
    profileImage: String
    orders: [Order]
    comments: [Comment]
    likedProducts: [Product]
    likedComments: [Comment]
    token: String
  }
`;
