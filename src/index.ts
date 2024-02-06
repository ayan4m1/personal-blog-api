import { gql } from 'graphql-tag';
import { GraphQLDate } from 'graphql-scalars';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { api } from './modules/config.js';
import { getLogger } from './modules/log.js';

const log = getLogger('api');

const typeDefs = gql`
  scalar Date

  type Query {
    stats: [Date]
  }

  type Mutation {
    setStat(date: Date): Date!
  }
`;

const resolvers = {
  Query: {},
  Mutation: {},
  Date: GraphQLDate
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => ({ req }),
  listen: {
    port: api.port
    // todo: use expressMiddleware to get CORS back
  }
});

log.info(`Server ready at ${url}`);
