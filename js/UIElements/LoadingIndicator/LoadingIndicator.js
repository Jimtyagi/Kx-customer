import React from "react";
import { View, ActivityIndicator } from "react-native";
import styles from "./LoadingIndicatorStyles";
import { colors } from "js/UIElements/colors";

const LoadingIndicator = props => {
  return props.loading ? (
    <View style={styles.loadingContainer}>
      <ActivityIndicator
        style={props.loaderStyles}
        color={props.color}
        size={props.size}
      />
    </View>
  ) : (
    <View style={styles.noLoadingContainer} />
  );
};

LoadingIndicator.defaultProps = {
  color: colors.java,
  size: "large",
  loaderStyles: {}
};

export default LoadingIndicator;
