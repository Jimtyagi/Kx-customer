import { ApolloClient } from "apollo-client";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from "apollo-cache-inmemory";
import { BatchHttpLink } from "apollo-link-batch-http";
import { ApolloLink, Observable } from "apollo-link";

import schema from "./schema.json";
import { AsyncStorage } from "react-native";
import { NEW_SERVER_URL } from "js/static";

const cache = new InMemoryCache({
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData: schema.data
  })
});

const request = async operation => {
  const token = await AsyncStorage.getItem("userJwt");
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${JSON.parse(token)}` : ""
    }
  });
};

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable(observer => {
      let handle;
      Promise.resolve(operation)
        .then(oper => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const client = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    new BatchHttpLink({
      uri: `${NEW_SERVER_URL}/graphql`
    })
  ]),
  cache
});

export default client;
