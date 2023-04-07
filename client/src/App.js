import { Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import React, { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Shop from "./pages/Shop";
import NavBar from './pages/NavBar';

// Creates a link to graphql at the /graphql endpoint.
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

// Exports a new ApolloClient that will include the graphql link and cache for localstorage.
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
//   // const [activePage, setActivePage] = useState("Home");

//   // const displayPage = () => {
//   //   // need to adjust for signup/login
//   //   switch (activePage) {
//   //     case "About":
//   //       return <About />;
//   //     case "Contact":
//   //       return <Contact />;
//   //     case "Events":
//   //       return <Events />;
//   //     case "Shop":
//   //       return <Shop />;
//   //     default:
//   //       return <Home />;
//   //   }
//   };


  return (
    <ApolloProvider client={client}>
    <div className="App">
      <NavBar />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/events" element={<Events />} />
       </Routes>
      {/* <nav>
        <ul>
          <li>
            <button onClick={() => setActivePage("Home")}>Home</button>
          </li>
          <li>
            <button onClick={() => setActivePage("About")}>About</button>
          </li>
          <li>
            <button onClick={() => setActivePage("Contact")}>Contact</button>
          </li>
          <li>
            <button onClick={() => setActivePage("Events")}>Events</button>
          </li>
          <li>
            <button onClick={() => setActivePage("Shop")}>Shop</button>
          </li>
        </ul>
      </nav>
      {displayPage()} */}
    </div>
    </ApolloProvider>
  );
}

export default App;