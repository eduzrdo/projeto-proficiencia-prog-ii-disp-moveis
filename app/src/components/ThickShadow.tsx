import { View, StyleSheet } from "react-native";

import { colors, sizes } from "@/constants";

export const ThickShadow = () => {
  return <View style={styles.shadow} />;
};

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
    top: 6,
    height: "100%",
    width: "100%",
    backgroundColor: colors.light[900],
    borderRadius: sizes.borderRadius,
    zIndex: -1,
  },
});
