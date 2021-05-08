'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    products(
      filter: FilterInput
      tag: String
      priority: Int
      sortby: String
      max: Int
    ): [Product!]
    product(id: ID!): Product
  }

  extend type Mutation {
    modifyProduct(
      id: ID!
      title: String
      published: Boolean
      description: String
      tag: String
      priority: Int
      storeInfo: StoreInfoInput
      likes: Int
    ): Product

    deleteProduct(id: ID!): String
  }

  type Product {
    id: ID
    image: Image
    title: String
    description: String
    tag: String
    priority: Int
    published:Boolean
    createdAt: String
    updatedAt: String
    numberOfComments: Int
    storeInfo: StoreInfo
    comments: [Comment]
    owner: User
    likes: Int
  }

  type StoreInfo {
    price: Int
    available: Boolean
    quantitySold: Int
    orderOrPreorder: String
    orders: [Order]
    deliveryType: String
  }

  input StoreInfoInput {
    price: Int
    available: Boolean
    quantitySold: Int
    orderOrPreorder: String
    deliveryType: String
  }

  type Image {
    publicId: String
    url: String
    mimetype: String
    filename: String
    responsiveBreakpoints: [String]
  }

  input FilterInput {
    key: String!
    value: Boolean!
  }
`;
