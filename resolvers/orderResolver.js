'use strict';

import Order from '../models/Order.js';
import Product from '../models/Product.js';

export default {
  Mutation: {
    createOrder: async (root, args) => {
      console.log('order args', args.orderedProducts.length);
      try {
        // calculate total cost for order
        // by summing the products of the price and quantity of each item  in the ordered item list
        // with the reduce method for list length > 1
        console.log('amt');
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
        const newOrder = await new Order({...args, totalAmount: totalAmount}).save()

        // query, populate and return newly created order
        return  await Order.findSortAndPopulateOrder({_id: newOrder._id});
      } catch (err) {
        console.log(`create order error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
