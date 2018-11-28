import { StyleSheet } from "react-native";
import { colors } from "js/UIElements/colors";
import { HEADER_HEIGHT } from "js/static";
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: colors.white,
    marginTop: -HEADER_HEIGHT,
    marginBottom: -HEADER_HEIGHT
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  markerIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.butterCup,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    borderColor: colors.white,
    borderWidth: 1
  }
});

export default styles;
