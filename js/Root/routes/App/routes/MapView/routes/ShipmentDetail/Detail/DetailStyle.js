import { StyleSheet, Dimensions } from "react-native";
import { colors } from "js/UIElements/colors";
import { HEADER_HEIGHT } from "js/static";
const Screen = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height - 75
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  panelContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  panel: {
    height: Screen.height + 2,
    backgroundColor: colors.white,
    marginHorizontal: 10,
    flexDirection: "column",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  panelHandleContainer: {
    width: "100%",
    paddingVertical: 16,
    alignItems: "center"
  },
  panelHandle: {
    width: 25,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#5887A5",
    alignSelf: "center"
  },
  scrollList: {
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 32
  }
});
export default styles;
