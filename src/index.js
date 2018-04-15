import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from "react-apollo";
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

import 'antd/dist/antd.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql', credentials: 'same-origin'});

// get the authentication token from local storage if it exists return the
// headers to the context so httpLink can read them
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  return {
    headers: {
      ...headers,
      "x-token": token,
      "x-refresh-token": refreshToken
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(
  <ApolloApp/>, document.getElementById('root'));
registerServiceWorker();
