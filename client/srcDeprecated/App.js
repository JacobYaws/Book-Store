import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav';
import Events from './pages/Events';
import { StoreProvider } from './utils/GlobalState';
// import OrderHistory from './pages/OrderHistory';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <StoreProvider>
            <Nav />
            <Routes>
              <Route 
                exact path="/" 
                component={Home} 
              />
              <Route 
                exact path="/login" 
                component={Login} 
              />
              <Route 
                exact path="/signup" 
                component={Signup} 
              />
              <Route 
                exact path="/events" 
                component={Events} 
              />
              <Route 
                exact path="/aboutus" 
                component={AboutUs} 
              />
              <Route
                exact path="/contact" 
                component={Contact} 
              />
              {/* <Route
                path="*" 
                element={<Contact />} 
              /> */}
            </Routes>
          </StoreProvider>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;