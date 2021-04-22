'use strict';
import config from './utils/config.js';
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
      app.listen(config.PORT, () =>
        console.log(`server url: http://localhost:${config.PORT}/graphql`)
      );
    });
  } catch (e) {
    console.error(`server error: ${e}`);
  }
})();
