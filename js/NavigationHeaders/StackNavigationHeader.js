import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Keyboard,
  TouchableWithoutFeedback,
  Image
} from "react-native";
import { HEADER_HEIGHT } from "js/static";
import styles from "./Styles";
import {
  DrawerIconSvg,
  CloseIconSvg,
  LeftChevronSvg
} from "js/UIElements/SvgImages";
import _ from "lodash";
import { colors } from "../UIElements/colors";

var RCTUIManager = require("NativeModules").UIManager;

let animatedValue = new Animated.Value(0);

const animateDown = () => {
  Animated.timing(animatedValue, {
    toValue: 1,
    duration: 400,
    easing: Easing.ease
  }).start();
};
const animateUp = () => {
  Animated.timing(animatedValue, {
    toValue: 0,
    duration: 400,
    easing: Easing.ease
  }).start();
};

const headerStyle = ({ navigation, color }) => {
  const params = navigation.state.params;
  const isScroll = _.get(params, `isScroll`, false);
  const isFixHeader = _.get(params, "isFixHeader", false);
  const customHeaderStyle = _.get(params, "customHeaderStyle", {});

  return {
    backgroundColor: color ? color : `rgba(0,0,0,0)`,
    height: HEADER_HEIGHT,
    elevation: isScroll && !isFixHeader ? 0.5 : 0,
    shadowColor: isScroll && !isFixHeader ? null : "transparent",
    paddingTop: 0,
    marginTop: 0,
    borderBottomWidth: 0,
    ...customHeaderStyle
  };
};

const opacityHeaderStyle = ({ navigation }) => {
  const defaultAnimationValue = new Animated.Value(1);

  const params = navigation.state.params;
  const isScroll = _.get(params, `isScroll`, false);
  const customHeaderStyle = _.get(params, "customHeaderStyle", {});
  const headerOpacity = _.get(params, `headerOpacity`, defaultAnimationValue);
  const opacityAnimation = headerOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: ["rgba(0,0,0,0.25)", "rgba(0,0,0,1)"]
  });

  return {
    backgroundColor: opacityAnimation,
    height: HEADER_HEIGHT,
    elevation: 0,
    shadowColor: isScroll ? null : "transparent",
    borderBottomWidth: 0,
    marginTop: 0,
    paddingTop: 0,
    ...customHeaderStyle
  };
};

const headerLeft = ({ navigation }) => {
  const params = navigation.state.params;
  const isScroll = _.get(params, `isScroll`, true);
  const leftChevronColor = _.get(params, `leftChevronColor`, "black");
  const headerLeftText = _.get(params, "headerLeftText", null);
  const headerLeftTextColor = _.get(
    params,
    "headerRightTextColor",
    colors.concrete
  );
  const onPressLeft = () => {
    Keyboard.dismiss();
    if (params && params.customOnHeaderLeftClick) {
      params.customOnHeaderLeftClick();
    } else {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity onPress={() => onPressLeft()} activeOpacity={0.8}>
      <View style={styles.headerLeftContainer}>
        {headerLeftText ? (
          <Text
            style={[
              styles.headerLeftText,
              { color: headerLeftTextColor },
              params.headerLeftTextStyle && params.headerLeftTextStyle
            ]}
          >
            {headerLeftText}
          </Text>
        ) : (
          <View style={styles.headerIconContainer}>
            <LeftChevronSvg fill={colors.white} width={6} height={12} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const headerLeftDrawer = ({ navigation, screenProps }) => {
  return (
    <TouchableWithoutFeedback
      activeOpacity={0.8}
      onPress={() =>
        screenProps.onDrawerClick ? screenProps.onDrawerClick() : null
      }
    >
      <View style={styles.headerLeftDrawerContainer}>
        <DrawerIconSvg width={20} height={20} fill={colors.concrete} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const headerRight = ({ navigation }) => {
  const params = navigation.state.params;
  const headerRightText = _.get(params, "headerRightText", "");
  const nextRoute = _.get(params, "nextRoute", "");
  const headerRightTextColor = _.get(
    params,
    "headerRightTextColor",
    colors.java
  );
  const onPressRight = () => {
    Keyboard.dismiss();
    if (params && params.customOnHeaderRightClick) {
      params.customOnHeaderRightClick();
    } else {
      navigation.navigate(nextRoute);
    }
  };
  return (
    <View>
      {headerRightText ? (
        <TouchableWithoutFeedback onPress={() => onPressRight()}>
          <View style={styles.headerRightContainer}>
            <Text
              style={[
                styles.headerRightText,
                { color: headerRightTextColor },
                params.headerRightTextStyle && params.headerRightTextStyle
              ]}
            >
              {headerRightText}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
  );
};

const headerTitle = ({
  onPressHeaderTitle,
  showTouchable,
  navigation,
  showLogo
}) => {
  const params = navigation.state.params;
  const isScroll = _.get(params, `isScroll`, false);
  const isFixHeader = _.get(params, "isFixHeader", false);
  const headerTitle = _.get(params, "headerTitle", "");

  return (
    <TouchableWithoutFeedback
      onPress={() => onPressHeaderTitle()}
      disabled={!showTouchable}
    >
      <View style={styles.headerTitleContainer}>
        {!showLogo ? (
          <Text
            style={[
              styles.headerTitleText,
              { color: isScroll || isFixHeader ? "black" : "transparent" }
            ]}
          >
            {headerTitle}
          </Text>
        ) : (
          <Image
            source={require("./logo.png")}
            style={{ width: 150, height: 40, resizeMode: "contain" }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const StackNavigationHeader = {
  headerRight,
  headerLeft,
  headerStyle,
  headerTitle,
  headerLeftDrawer
};

export default StackNavigationHeader;
