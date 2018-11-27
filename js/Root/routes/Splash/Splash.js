import React, { Component } from "react";
import { View } from "react-native";
import _ from "lodash";
import { LoadingIndicator } from "js/UIElements";

import { connect } from "react-redux";

class Splash extends Component {
  componentWillMount() {
    const { navigate } = this.props.navigation;
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff"
        }}
      >
        <LoadingIndicator loading={true} />
      </View>
    );
  }
}

//$ /Users/abc/Library/Android/sdk/platform-tools/systrace/systrace.py --time=20 -o trace.html sched gfx view -a com.KlearExpress.customer

const mapActionCreators = {};

const mapStateToProps = state => {
  return {
    userId: 1
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(Splash);
