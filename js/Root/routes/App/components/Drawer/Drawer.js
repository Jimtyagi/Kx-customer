import React, { Component } from "react";
import { View, Animated, TouchableWithoutFeedback } from "react-native";
import Interactable from "react-native-interactable";
import { styles, RemainingWidth, SideMenuWidth } from "./DrawerStyle";
import { connect } from "react-redux";
import DrawerHeader from "./components/DrawerHeader";

import _ from "lodash";

const DRAWER_VELOCITY = (SideMenuWidth * 2000) / 300;
class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = { drawerState: "closed", layerPointerEvents: "auto" };
    this._deltaX = new Animated.Value(0);
    props.customRef(this);
  }

  isOpen = () => {
    return this.state.drawerState == "open";
  };

  shouldComponentUpdate(nextProps, nextState) {
    const isEqual =
      _.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state);
    return !isEqual;
  }
  render() {
    return (
      <View style={styles.container} pointerEvents={"box-none"}>
        {this.isOpen() && (
          <TouchableWithoutFeedback
            style={styles.overlayContainer}
            onPress={this.onClosePress}
          >
            <View pointerEvents={this.state.layerPointerEvents}>
              <Animated.View
                style={[
                  styles.overlay,
                  {
                    opacity: this._deltaX.interpolate({
                      inputRange: [-SideMenuWidth, 0],
                      outputRange: [0, 1],
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp"
                    })
                  }
                ]}
              />
              <Animated.View
                style={[
                  styles.overlay,
                  {
                    opacity: this._deltaX.interpolate({
                      inputRange: [0, SideMenuWidth],
                      outputRange: [1, 0],
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp"
                    })
                  }
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        )}
        <View style={styles.sideMenuContainer} pointerEvents="box-none">
          <Interactable.View
            ref="DrawerInstance"
            horizontalOnly={true}
            snapPoints={[
              { x: 0, id: "open" },
              { x: -SideMenuWidth - 10, id: "closed" }
            ]}
            boundaries={{ right: RemainingWidth / 2, bounce: 0.0 }}
            initialPosition={{ x: -SideMenuWidth }}
            onSnap={this.onDrawerSnap}
            onDrag={this.onDragEvent}
            animatedValueX={this._deltaX}
          >
            <View style={styles.sideMenu}>
              <DrawerHeader onClosePress={this.onClosePress} />
            </View>
          </Interactable.View>
        </View>
      </View>
    );
  }

  onDrawerClick = () => {
    this.setState({ drawerState: "open", layerPointerEvents: "auto" });
    this.refs["DrawerInstance"].setVelocity({ x: DRAWER_VELOCITY });
  };

  onClosePress = () => {
    this.refs["DrawerInstance"].setVelocity({ x: -DRAWER_VELOCITY });
    this.setState({ layerPointerEvents: "none" });
  };

  onDrawerSnap = event => {
    const snapPointId = event.nativeEvent.id;
    this.setState({ drawerState: snapPointId });
  };

  onDragEvent = event => {
    const eventVal = event.nativeEvent;
    if (eventVal.state == "end" && eventVal.targetSnapPointId == "close") {
      this.setState({ layerPointerEvents: "none" });
    }
  };
}

const mapActionCreators = {};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionCreators
)(Drawer);
