'use strict';
import env from 'dotenv';
env.config();
import { ApolloServer } from 'apollo-server-express';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import mongoDB from './db/mongoDB.js';

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers
    });

    const app = express();

    server.applyMiddleware({ app, path: '/graphql' });

    mongoDB.on('connected', () => {
      app.listen(process.env.PORT, () =>
        console.log(`server url: http://localhost:${process.env.PORT}/graphql`)
      );
    });
  } catch (e) {
    console.error(`server error: ${e}`);
  }
})();
