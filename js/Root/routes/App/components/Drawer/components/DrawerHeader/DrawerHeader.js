import React, { Component } from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import styles from "./DrawerHeaderStyle";
import { CloseIconSvg } from "js/UIElements/SvgImages";
import { colors } from "js/UIElements/colors";

class DrawerHeader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={() => this.props.onClosePress()}>
          <View style={styles.headerLeft}>
            <CloseIconSvg fill={colors.white} width={16} height={16} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default DrawerHeader;
