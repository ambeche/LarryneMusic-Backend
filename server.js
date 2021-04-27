'use strict';
import config from './utils/config.js';
import { ApolloServer } from 'apollo-server-express';
import { constraintDirective } from 'graphql-constraint-directive';
import helmet from 'helmet';
import cors from 'cors';
import schemas from './schemas/index.js';
import resolvers from './resolvers/index.js';
import express from 'express';
import mongoDB from './db/mongoDB.js';

(async () => {
  try {
    const server = new ApolloServer({
      typeDefs: schemas,
      resolvers,
      schemaTransforms: [constraintDirective()]
    });

    const app = express();

    app.use(cors);
    app.use(
      helmet({
        ieNoOpen: false, // disabling X-Download-Options
        contentSecurityPolicy: false
      })
    );

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
