import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloLink, split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { Root } from './root';
import './styles/index.css';

const httpLink = new HttpLink({ uri: '/graphql' });

// apollo client setup
const client = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
const render = (Root: React.ComponentType) =>
  ReactDOM.render(
    <ApolloProvider client={client} >
      <Root />
    </ApolloProvider>,
    document.getElementById('root'),
  );

render(Root);

if (__DEVELOPMENT__ && module.hot) {
  const reload = () => {
    render(require('./root').Root);
  };

  module.hot.accept(['./root'], reload);
  module.hot.accept(['./graphql/generated-models'], reload);
}