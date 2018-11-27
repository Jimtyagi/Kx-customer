import React from "react";

import { connect } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { StackNavigationHeader } from "js/NavigationHeaders";
import { MapDetail } from "../routes";
import { screenChange } from "js/modules/navigationModule";
import { navigateOnce } from "js/Services";
import { Header } from "react-navigation";
import { isIphoneX } from "js/Services";
import { transitionConfig } from "js/CommonStylesAndUtils/StackNavigationScreenUtils";

const MapNavigator = createStackNavigator(
  {
    mapDetail: {
      screen: MapDetail,
      path: "mapDetail",
      navigationOptions: ({ navigation, screenProps }) => {
        return {
          headerStyle: StackNavigationHeader.headerStyle({ navigation }),
          headerLeft: StackNavigationHeader.headerLeftDrawer({
            navigation,
            screenProps
          }),
          headerLayoutPreset: "center",
          headerRight: StackNavigationHeader.headerRight({ navigation }),
          headerTitle: StackNavigationHeader.headerTitle({
            navigation,
            showLogo: true
          })
        };
      }
    }
  },
  {
    initialRouteName: "mapDetail",
    headerMode: "screen",
    transitionConfig
  }
);

MapNavigator.router.getStateForAction = navigateOnce(
  MapNavigator.router.getStateForAction
);

class MapViewComp extends React.Component {
  onStateChange = (prevState, currentState) => {
    this.props.screenChange(prevState, currentState, "mapView");
  };

  render() {
    return (
      <MapNavigator
        screenProps={{ onDrawerClick: this.props.screenProps.onDrawerClick }}
        onNavigationStateChange={this.onStateChange}
        ref={ref => (this.myNav = ref)}
      />
    );
  }
}

const mapActionCreators = {
  screenChange
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(MapViewComp);
