'use strict';

import User from '../models/User.js';
import bcrypt from 'bcrypt';

export default {
  Mutation: {
    registerUser: async (root, args) => {
      try {
        const salt = 12;
        const passwordHash = await bcrypt.hash(args.password, salt);
        const userWithHash = {
          ...args,
          password: passwordHash
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        //delete result.passwordHash // protect user's password
        console.log('new user', result);
        return result;
      } catch (err) {
        console.log(`add user error: ${err.message}`);
        throw new Error(err);
      }
    }
  }
};
