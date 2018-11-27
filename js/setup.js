import React, { Component } from "react";
import App from "./index";
import configureStore from "./configureStore";
import { ApolloProvider } from "react-apollo";
import { Provider } from "react-redux";
import client from "./apoloClient";
import setupMomentLocales from "js/CommonStylesAndUtils/SetupMomentLocales";

function setup(): React.Component {
  class Root extends Component {
    constructor() {
      super();
      setupMomentLocales();
      this.state = {
        isLoading: false,
        store: configureStore(() => this.setState({ isLoading: false }))
      };
    }

    render() {
      return (
        <ApolloProvider client={client}>
          <Provider store={this.state.store}>
            <App />
          </Provider>
        </ApolloProvider>
      );
    }
  }

  return Root;
}

export default setup;
