import { StyleSheet } from "react-native";
import { colors } from "js/UIElements/colors";
import { HEADER_TITLE_HEIGHT } from "js/static";

export default (styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    minHeight: HEADER_TITLE_HEIGHT,
    backgroundColor: "white",
    width: "100%",
    justifyContent: "flex-end",
    paddingHorizontal: 24
  },
  title: {
    color: colors.pepper,
    fontFamily: "AvenirNext-Bold",
    fontSize: 28,
    letterSpacing: -0.4
  }
}));
