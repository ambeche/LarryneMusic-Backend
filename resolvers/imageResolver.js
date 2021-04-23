'use strict';

export default {
  FileOfProduct: {
    image: (root) => {
      return {
        street: root.street,
        city: root.city,
      };
    },
  },
};
