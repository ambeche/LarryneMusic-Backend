'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    user: User
  }

  extend type Mutation {
    registerUser(userInput: UserInput): User
    login(email: String!, password: String!): User
    modifyUser(fullname: String, shippingAddress: ShippingAddressInput): User
  }

  type User {
    id: ID
    email: String
    fullname: String
    subscribed: Boolean
    shippingAddress: ShippingAddress
    profileImage: String
    orders: [Order]
    comments: [Comment]
    likedProducts: [Product]
    likedComments: [Comment]
    role: String
    roleValue: String
    token: String
  }

  input UserInput {
    email: String! @constraint(format: "email")
    password: String! @constraint(minLength: 8)
    fullname: String!
  }
`;
