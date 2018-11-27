import { StyleSheet, Dimensions } from "react-native";
import { colors } from "js/UIElements/colors";
import { fontStyle } from "js/static";
const styles = StyleSheet.create({
  container: {
    width: "100%",

    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: colors.silver,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  topContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8
  },
  topLeftContainer: {
    flexBasis: "90%",
    flexDirection: "row"
  },
  topRightContainer: {
    alignItems: "flex-end",
    flexBasis: "10%"
  },
  statusIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.butterCup,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  detailTitleContainer: {
    flex: 1
  },
  titleText: {
    fontSize: 16,
    color: colors.black,
    height: 20,
    ...fontStyle.bold
  },
  subTitleTextContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center"
  },
  subTitleText1: {
    fontSize: 12,
    color: colors.silverChalice,
    ...fontStyle.regular,
    width: 30
  },
  subTitleText2: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    ...fontStyle.regular
  },
  detailTextContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  fromText: {
    flexBasis: "75%",
    fontSize: 12,
    color: colors.black,
    ...fontStyle.light
  },
  toText: {
    flexBasis: "70%",
    fontSize: 12,
    color: colors.black,
    ...fontStyle.regular
  },
  etaText: {
    flexBasis: "25%",
    fontSize: 10,
    textAlign: "right",
    color: colors.black,
    ...fontStyle.regular
  },
  dateText: {
    flexBasis: "30%",
    fontSize: 14,
    textAlign: "right",
    color: colors.black,
    ...fontStyle.bold
  },
  footerTextContainer: {
    marginTop: 16,
    width: "100%",
    flexDirection: "column"
  },
  footerText: {
    fontSize: 12,
    textAlign: "right",
    color: colors.black,
    ...fontStyle.regular
  },
  footerSubText: {
    fontSize: 12,
    textAlign: "right",
    color: colors.black,
    ...fontStyle.light
  },
  linearGradientContainer: {
    width: "100%",
    marginTop: 16,
    position: "relative"
  },
  linearGradient: {
    height: 4,
    position: "absolute",
    left: 0
  },
  circleIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    flexShrink: 0,
    left: "0%",
    top: -6,
    position: "absolute",
    zIndex: 11
  }
});
export default styles;
