import { StyleSheet } from "react-native";
import { colors } from "js/UIElements/colors";

const styles = StyleSheet.create({
  container: {
    width: 225,
    height: 180,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: "hidden"
  },
  image: {
    height: 84,
    width: "100%"
  },
  detailContainer: {
    padding: 8
  },
  box1: {
    flex: 0.5
  },
  box2: {
    flex: 2
  },
  detailBox: {
    flexDirection: "row"
  }
});

export default styles;
