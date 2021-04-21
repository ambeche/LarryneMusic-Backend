'use strict';

import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    orders: [Order]
    order(orderId: ID!): Order
  }

  extend type Mutation {
    createOrder(
      transactionType: String
      deliveryStatus: Boolean
      quantity: Int
      shippingAddress: ShippingAddressInput
      orderDate: Int
      deliveryDate: Int
      estimatedDateOfDelivery: Int
      transactionStatus: String
      shippingDetails: String
      products: [ID]!
      orderedBy: ID
    ): Order

    modifyOrder(
      OrderId: ID!
      transactionType: String
      deliveryStatus: Boolean
      quantity: Int
      shippingAddress: ShippingAddressInput
      deliveryDate: Int
      estimatedDateOfDelivery: Int
      transactionStatus: String
      shippingDetails: String
    ): Order

    deleteOrder(orderId: ID!): String
  }

  type Order {
    id: ID
    transactionType: String
    deliveryStatus: Boolean
    quantity: Int
    shippingAddress: ShippingAddress
    orderDate: Int
    deliveryDate: Int
    estimatedDateOfDelivery: Int
    transactionStatus: String
    shippingDetails: String
    orderedBy: User
    products: [Product]
  }
`;
