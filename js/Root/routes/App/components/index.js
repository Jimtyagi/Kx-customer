import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { createTabNavigator, TabBarBottom } from "react-navigation";
import { TAB_BAR_HEIGHT, eventObj } from "js/static";
import { colors } from "js/UIElements/colors";
import MapView from "../routes/MapView";

import { screenChange } from "js/modules/navigationModule";

import Drawer from "./Drawer";

import _ from "lodash";

const prefix = "klearExpress://app/";

const AppNavigator = createTabNavigator(
  {
    mapView: {
      screen: MapView,
      path: "mapView",
      navigationOptions: {
        tabBarLabel: "Map"
      }
    }
  },

  {
    navigationOptions: ({ navigation, screenProps }) => {
      return {
        tabBarVisible: screenProps.showAppNavigatorTab,
        tabBarOnPress: ({ previousScene, scene, jumpToIndex }) => {
          if (!scene.focused) {
            jumpToIndex(scene.index);
          } else {
            eventObj.emit("scrollToTop");
          }
        }
      };
    },
    tabBarOptions: {
      style: {
        height: TAB_BAR_HEIGHT,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: colors.snow,
        alignItems: "center",
        justifyContent: "center"
      },
      labelStyle: {
        fontSize: 11,
        fontWeight: "500"
        // paddingBottom:8,
      },
      indicatorStyle: {
        backgroundColor: colors.soapstone
      },
      activeTintColor: colors.teal,
      inactiveTintColor: colors.soapstone,
      upperCaseLabel: false
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    swipeEnabled: false,
    animationEnabled: false,
    backBehavior: "none",
    initialRouteName: "mapView"
  }
);

class App extends React.Component {
  static router = AppNavigator.router;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    //  eventObj.addListener("pushNotification", this.onOpenedPushNotification);
  }

  componentWillUnmount() {
    // eventObj.removeListener("pushNotification", this.onOpenedPushNotification);
  }

  onOpenedPushNotification = ({ notificationData }) => {};

  onStateChange = (prevState, currentState) => {
    this.props.screenChange(prevState, currentState, "app");
  };

  onDrawerClick = () => {
    if (this.drawer) {
      this.drawer.onDrawerClick();
    }
  };

  static router = AppNavigator.router;

  render() {
    //TODO: change backgroundColor of SafeAreaView to #fff after fixing internal hacks

    return (
      <View style={{ width: "100%", flex: 1, backgroundColor: "#fff" }}>
        <Drawer customRef={ref => (this.drawer = ref)} />
        <AppNavigator
          ref={ref => (this.myNav = ref)}
          uriPrefix={prefix}
          onNavigationStateChange={this.onStateChange}
          screenProps={{
            showAppNavigatorTab: this.props.showAppNavigatorTab,
            onDrawerClick: this.onDrawerClick
          }}
        />
      </View>
    );
  }
}

const mapActionCreators = {
  screenChange
};

const mapStateToProps = state => {
  return {
    showAppNavigatorTab: false //state.navigation.showAppNavigatorTab,
  };
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(App);
