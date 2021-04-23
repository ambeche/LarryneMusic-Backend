'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    products(tag: String, priority: Int, limit: Int): [Product]
    product(productId: ID!): Product
  }

  extend type Mutation {
    modifyProduct(
      productId: ID!
      cloudinaryId: String
      url: String
      mimetype: String
      filename: String
      title: String!
      description: String
      tag: String
      priority: Int
      storeInfo: StoreInfoInput
    ): Product

    deleteProduct(productId: ID!): String
  }

  type Product {
    id: ID
    image: Image
    title: String
    description: String
    tag: String
    priority: Int
    storeInfo: StoreInfo
    comments: [Comment]
    owner: User
    likes: Int
  }

  type StoreInfo {
    price: Int
    availability: Boolean
    quantitySold: Int
    orderOrPreorder: String
    orders: [Order]
    deliveryType: String
  }

  input StoreInfoInput {
    price: Int!
    availability: Boolean!
    quantitySold: Int
    orderOrPreorder: String!
    deliveryType: String!
  }

  type Image {
    publicId: String
    url: String
    mimetype: String
    filename: String
    responsiveBreakpoints: [String]
  }
`;
