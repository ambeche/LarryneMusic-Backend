import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})
// client configured with createUploadLink to allow multipart/files uploads
const uploadLink = createUploadLink({ uri: 'http://localhost:3001/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink)
})

ReactDOM.render(
  
    <ApolloProvider client={client}>
      <Router>
      <App /> 
      </Router>
    </ApolloProvider>,
 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();