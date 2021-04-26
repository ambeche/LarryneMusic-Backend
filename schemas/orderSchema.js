'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    Orders: [Order]
    Order(orderId: ID!): Order
  }

  extend type Mutation {
    createOrder(
      transactionType: String
      delivered: Boolean
      shippingAddress: ShippingAddressInput
      deliveryDate: String
      estimatedDateOfDelivery: String
      transactionStatus: String
      orderedProducts: [ItemTypeInput!]
      orderedBy: ID
    ): Order

    modifyOrder(
      OrderId: ID!
      transactionType: String
      delivered: Boolean
      shippingAddress: ShippingAddressInput
      deliveryDate: Int
      estimatedDateOfDelivery: String
      transactionStatus: String
      shippingDetails: String
    ): Order
  }

  type Order {
    id: ID
    transactionType: String
    delivered: Boolean
    totalAmount: Int
    shippingAddress: ShippingAddress
    orderDate: String
    deliveryDate: String
    estimatedDateOfDelivery: String
    transactionStatus: String
    shippingDetails: String
    orderedBy: User
    orderedProducts: [ItemType]
  }

  type ItemType {
    product: Product
    quantity: Int
  }

  input ItemTypeInput {
    product: ID
    quantity: Int
  }
`;
