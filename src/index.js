import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo";

import 'antd/dist/antd.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const client = new ApolloClient({uri: "http://localhost:4000/graphql"});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)

ReactDOM.render(
  <ApolloApp/>, document.getElementById('root'));
registerServiceWorker();
