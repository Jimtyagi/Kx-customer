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
import { DrawerIconSvg, CloseIconSvg } from "js/UIElements/SvgImages";
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

const headerStyle = ({ navigation }) => {
  const params = navigation.state.params;
  const isScroll = _.get(params, `isScroll`, false);
  const isFixHeader = _.get(params, "isFixHeader", false);
  const customHeaderStyle = _.get(params, "customHeaderStyle", {});
  return {
    backgroundColor: `rgba(0,0,0,0.25)`,
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
    outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,1)"]
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
          <View />
        )}
      </View>
    </TouchableOpacity>
  );
};

const headerShadowLeft = ({ navigation }) => {
  const params = navigation.state.params;
  const isScroll = _.get(params, `isScroll`, true);

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
        <Image
          source={require("./back.png")}
          style={{ width: 15, height: 25 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const headerLeftClose = ({ navigation }) => {
  const params = navigation.state.params;
  const height = _.get(params, "leftChevronHeight", 14);
  const width = _.get(params, "leftChevronWidth", 14);
  const leftChevronColor = _.get(params, `leftChevronColor`, "black");
  const onPressLeft = () => {
    if (params && params.customOnHeaderLeftClick) {
      params.customOnHeaderLeftClick();
    } else {
      navigation.goBack();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => onPressLeft()}>
      <View style={styles.headerLeftContainer}>
        <CloseIconSvg width={width} height={height} fill={leftChevronColor} />
      </View>
    </TouchableWithoutFeedback>
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
