import { StyleSheet, Dimensions } from "react-native";
import { HEADER_HEIGHT, HEADER_PADDING_TOP } from "js/static";
import { colors } from "js/UIElements/colors";
const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  "window"
);

const Screen = Dimensions.get("window");
const MaxSideMenuWidth = 480;
export const SideMenuWidth = Math.min(Screen.width - 72, MaxSideMenuWidth);
export const RemainingWidth = Screen.width - SideMenuWidth;

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1000
  },
  sideMenuContainer: {
    position: "absolute",
    top: 0,
    left: -RemainingWidth,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    zIndex: 1002
  },
  sideMenu: {
    left: 0,
    width: Screen.width,
    paddingLeft: RemainingWidth,
    flex: 1,
    backgroundColor: colors.mineshaft
  },
  sideMenuTitle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20
  },
  header: {
    paddingTop: HEADER_PADDING_TOP,
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    zIndex: 1001
  },
  body: {
    flex: 1,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center"
  },
  overlay: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  overlayContainer: {
    position: "absolute",
    width: "100%",
    height: "100%"
  }
});
