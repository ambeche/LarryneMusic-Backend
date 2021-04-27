'use strict';
import passport from 'passport';
import { Strategy } from 'passport-local';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';
import User from '../../models/User.js';
import config from '../config.js';

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

// local strategy for username password login
passport.use(
  new Strategy(
    {
      usernameField: 'email'
    },
    async (username, password, onComplete) => {
      try {
        const user = await User.findone({ username });
        console.log('Local strategy', user);
        if (user === null) {
          return onComplete(null, false, { message: 'invalid credentials' });
        }

        const validateUser = await bcrypt.compare(password, user.password);

        if (!validateUser) {
          return onComplete(null, false, { message: 'invalid credentials!' });
        }

        const userWithoutPass = user.toObject();
        delete userWithoutPass.password; // delete user's password for security

        return onComplete(null, userWithoutPass, {
          message: 'Logged In Successfully'
        });
      } catch (err) {
        return onComplete(err);
      }
    }
  )
);

// JWT strategy for handling bearer token

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.SECRET
    },
    async (jwtPayload, onComplete) => {
      try {
        const user = await User.findById(jwtPayload._id);
        console.log('jwt strategy', jwtPayload);
        if (user === null) {
          return onComplete(null, false);
        }
        delete user.password;
        return onComplete(null, user);
      } catch (err) {
        return onComplete(err);
      }
    }
  )
);

export default passport;
