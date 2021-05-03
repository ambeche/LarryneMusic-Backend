'use strict';
import config from './utils/config.js';
import { ApolloServer } from 'apollo-server-express';
import helmet from 'helmet';
import cors from 'cors';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import production from  './ssl/production.js';
import localhost from './ssl/localhost.js'
import mongoDB from './db/mongoDB.js';
import { constraintDirective } from 'graphql-constraint-directive';
import auth from './utils/auth/auth.js';

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      context: async ({req, res}) => {
        const user = await auth.verifyAuth(req, res);
        return {req, res, user};
     },
      schemaTransforms: [constraintDirective()]
    });

    const app = express();

    app.use(cors() );
    app.use(
      helmet({
        ieNoOpen: false, // disabling X-Download-Options
        contentSecurityPolicy: false
      })
    );

    server.applyMiddleware({ app, path: '/graphql' });


    mongoDB.on('connected', () => {
         config.NODE_ENV = config.NODE_ENV || 'development';
    if (config.NODE_ENV === 'production') {
      console.log('prduction');
      production(app, config.PORT);
    } else {
      console.log('localhost');
      localhost(app, config.HTTPS_PORT, config.PORT );
    }
       })
   } catch (e) {
      console.log('server error: ', e);
   }
})();
