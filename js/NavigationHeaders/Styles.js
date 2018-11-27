import { StyleSheet, Platform } from "react-native";
import { colors } from "../UIElements/colors";
import { fontStyle } from "js/static";

export default (styles = StyleSheet.create({
  headerLeftContainer: {
    paddingRight: 16,
    //    backgroundColor:'red',
    height: "100%",
    paddingLeft: 24,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center"
  },
  headerLeftDrawerContainer: {
    paddingRight: 16,
    height: "100%",
    paddingLeft: 24,
    paddingTop: 4,
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center"
    //    backgroundColor:'red',
  },
  headerRightContainer: {
    height: "100%",
    paddingRight: 24,
    paddingLeft: 16,
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center"
    //  backgroundColor:'red',
  },

  courseHeaderRight: {
    height: "100%",
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row"
  },
  activityHeaderRight: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  leftArrow: {
    paddingHorizontal: 12
    //alignItems:'center',
    //justifyContent: 'center'
  },
  todayContainer: {
    paddingHorizontal: 12
    //justifyContent:'center',
    //alignItems:'center'
  },
  todayText: {
    fontFamily: "AvenirNext-Bold",
    fontSize: 14,
    alignSelf: "center",
    color: colors.java
  },
  rightArrow: {
    paddingRight: 24,
    paddingLeft: 12
  },
  filterSvg: {
    paddingHorizontal: 12
  },
  addButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.salmonPink,
    borderRadius: 14,
    width: 64,
    height: 28
  },
  addButtonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 14
    //letterSpacing: -0.4
  },
  headerRightText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    width: 64
  },
  headerLeftText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "left",
    width: 64
  },
  headerTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flex: 1
    // marginLeft: Platform.OS=='ios'?-16:12
  },
  headerTitleText: {
    textAlign: "center",
    fontSize: 16,
    //width: "100%",
    color: "black",
    ...fontStyle.medium
  }
}));
