import cors from 'cors';
import http from 'http';
import express from 'express';
import { readFile } from 'fs/promises';
import { ApolloServer } from '@apollo/server';
import { GraphQLDate } from 'graphql-scalars';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { api } from './config.js';
import * as Query from '../queries/index.js';
import * as Mutation from '../mutations/index.js';

export const start = async (): Promise<string> => {
  const app = express();
  const httpServer = http.createServer(app);
  const apolloServer = new ApolloServer({
    typeDefs: await readFile('./schema.graphql', 'utf-8'),
    resolvers: {
      Query,
      Mutation,
      Date: GraphQLDate
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await apolloServer.start();

  app.use(
    api.urlPrefix,
    cors<cors.CorsRequest>({
      origin: api.corsDomain
    }),
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ req })
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: api.port }, resolve)
  );

  return `http://localhost:${api.port}${urlPrefix}`;
};
