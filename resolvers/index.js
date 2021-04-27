'use strict';

import commentResolver from './commentResolver.js';
import orderResolver from './orderResolver.js';
import productResolver from './productResolver.js';
import userResolver from './userResolver.js';

export default [userResolver, productResolver, commentResolver, orderResolver];
