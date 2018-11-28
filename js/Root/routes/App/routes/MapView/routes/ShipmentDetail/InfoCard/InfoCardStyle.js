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
    shadowRadius: 2
  }
});

export default styles;
