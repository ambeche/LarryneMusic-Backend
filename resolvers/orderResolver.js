'use strict';
// Order mutations and queries
// Regular users can only createOrders, only admin is authorized to modify and read orders
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { AuthenticationError } from 'apollo-server-express';
import { verifyAdminAccess } from './resolverHelpers.js';

export default {
  Mutation: {
    createOrder: async (root, args, { user }) => {
      try {
        // calculate total cost for order
        // by summing the products of the price and quantity of each item  in the ordered item list
        // with the reduce method for list length > 1
        const totalAmount =
          args.orderedProducts.length > 1
            ? await args.orderedProducts.reduce(async (previouspdt, pdt) => {
                const pdtoneInDB = await Product.findById(previouspdt.product);
                const pdtInDB = await Product.findById(pdt.product);
                console.log('prev', previouspdt);
                return (
                  pdtoneInDB.storeInfo.price * previouspdt.quantity +
                  pdtInDB.storeInfo.price * pdt.quantity
                );
              })
            : await (async () => {
                const [item] = args.orderedProducts;
                const pdtDb = await Product.findById(item.product);
                return pdtDb.storeInfo.price * item.quantity;
              })();

        console.log('amt', totalAmount);

        // create and save order to db
        const newOrder = await new Order({
          ...args,
          totalAmount: totalAmount,
          orderedBy: user?._id ?? undefined // sets user if order is made by authenticated user
        }).save();

        // query, populate and return newly created order
        return await Order.findSortAndPopulateOrder({ _id: newOrder._id });
      } catch (err) {
        console.log(`create order error: ${err.message}`);
        throw new Error(err);
      }
    },
    modifyOrder: async (root, args, { user }) => {
      // role based access control to restrict access; only admin is authorized
      // throws authentication error otherwise

      if (await verifyAdminAccess(user)) {
        try {
          // find and update order

          const updatedOrder = await Order.findOneAndUpdate(
            args.id,
            { ...args },
            {
              new: true,
              omitUndefined: true
            }
          );

          console.log('updated order', updatedOrder);

          // query, populate and return updated  Order
          return await Order.findSortAndPopulateOrder({
            _id: updatedOrder._id
          });
        } catch (err) {
          console.log(`modify order error: ${err.message}`);
        }
      }
      throw new AuthenticationError('Not Authorized; Access Denied!');
    }
  },

  Query: {
    orders: async (root, args, { user }) => {
      // returned Orders are filtered by date range and/or sorted based on query params passed.
      // defalult sorting is by date in decending order

      if (await verifyAdminAccess(user)) {
        try {
          if (args.dateRange || args.date) {
            const dateRange = dateValidator(args.dateRange);
            const date = dateValidator({}, args.orderDate);

            if (dateRange) {
              return await Order.findSortAndPopulateOrder(
                { createdAt: { $gte: dateRange.first, $lte: dateRange.last } },
                args.sortby
              );
            }
            return await Order.findSortAndPopulateOrder(
              { orderDate: date },
              args.sortby
            );
          }

          return Order.findSortAndPopulateOrder({}, args.sortby);
        } catch (e) {
          console.log(`get orders error: ${e.message}`);
        }
      }
      throw new AuthenticationError('Not Authorized; Access Denied!');
    },
    order: async (root, args, { user }) => {
      // query Order by id
      if (await verifyAdminAccess(user)) {
        try {
          return Order.findSortAndPopulateOrder({ _id: args.id });
        } catch (e) {
          console.log(`get order error: ${e.message}`);
        }
        throw new AuthenticationError('Not Authorized; Access Denied!');
      }
    }
  }
};
