import React from 'react';
import ReactDOM from 'react-dom';
import {ApolloClient} from 'apollo-client';
import {ApolloProvider} from "react-apollo";
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { ApolloLink } from "apollo-link";

import 'antd/dist/antd.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({uri: 'http://localhost:4000/graphql'});

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

const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(res => {
    const context = operation.getContext();
    const { response: { headers } } = context;
    console.log(headers.get('x-token'));
    const token = headers.get('x-token');
    const refreshToken = headers.get('x-refresh-token');
    if(token) {
      localStorage.setItem('token', token);
    }
    if(refreshToken) {
      localStorage.setItem('refreshToken', token);
    }
    return res;
  })
});

const link = authLink.concat(afterwareLink).concat(httpLink);

const client = new ApolloClient({
  link,
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
