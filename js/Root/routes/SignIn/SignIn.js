import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

class SignIn extends Component {
  componentWillMount() {}

  render() {
    return <View />;
  }
}

const mapActionCreators = {};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(SignIn);
