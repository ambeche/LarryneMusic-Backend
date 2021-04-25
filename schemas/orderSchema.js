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
      deliveryStatus: Boolean
      quantity: Int
      shippingAddress: ShippingAddressInput
      deliveryDate: String
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
  }

  type Order {
    id: ID
    transactionType: String
    deliveryStatus: Boolean
    quantity: Int
    shippingAddress: ShippingAddress
    orderDate: String
    deliveryDate: String
    estimatedDateOfDelivery: String
    transactionStatus: String
    shippingDetails: String
    orderedBy: User
    products: [Product]
  }
`;
