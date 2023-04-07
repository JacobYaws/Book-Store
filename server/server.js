const express = require('express');
// Uncomment the following code once you have built the queries and mutations in the client folder
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
require("dotenv").config();
const { typeDefs, resolvers } = require('./schema');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

//const routes = require('./')

const PORT = process.env.PORT || 3001;
const app = express();

// Uncomment the following code once you have built the queries and mutations in the client folder

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
    playground: true,
    introspection: true
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')));
  }

//adding the static assets
app.use('/images', express.static(path.join(__dirname, '/client/src/images')));

// Uncomment the following code once you have built the queries and mutations in the client folder

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});



// need to add apolloserver, middleware and static assets once made and graphQL
async function startApolloServer(typeDefs, resolvers){
  await server.start()
  server.applyMiddleware({app})
  db.once('open', () => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer(typeDefs, resolvers);

