'use strict';

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import auth from '../utils/auth/auth.js';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Mutation: {
    registerUser: async (root, args) => {
      const { email, password, fullname } = args.userInput;
      try {
        const salt = 12;
        const passwordHash = await bcrypt.hash(password, salt);
        const userWithHash = {
          email,
          password: passwordHash,
          fullname
        };
        const newUser = new User(userWithHash);
        const result = await newUser.save();
        const userobj = result.toObject();
        delete userobj.password; // protect user's password

        return userobj;
      } catch (err) {
        console.log(`add user error: ${err.message}`);
        throw new Error(err);
      }
    }
  },

  Query: {
    user: async (parent, args, { user }) => {
      // a User's account can only be accessed by the authenticated user himself/herself
      if (user) {
        console.log('userResolver', user);
        const userInDB = await User.findById(user._id);
        delete userInDB.password;
        console.log('withoutPass', userInDB);
        return userInDB;
      }
      throw new AuthenticationError('Authorization Denied!');
    },

    login: async (parent, args, { req, res }) => {
      // injecting username and password to req.body for passport
      console.log(args);
      req.body = args;
      console.log('req', req.body);
      try {
        const { user, token } = await auth.login(req, res);

        console.log('auth', user);
        return {
          id: user._id,
          email: user.email,
          fullname: user.fullname,
          token
        };
      } catch (e) {
        console.error('error', e);
        throw new AuthenticationError('invalid credentials');
      }
    }
  }
};
