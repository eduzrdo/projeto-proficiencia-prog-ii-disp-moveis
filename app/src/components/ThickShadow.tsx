import { View, StyleSheet } from "react-native";

import { colors, sizes } from "@/constants";

type ThickShadowProps = {
  color?: string;
};

export const ThickShadow = ({ color }: ThickShadowProps) => {
  return (
    <>
      <View
        style={[
          styles.shadow,
          {
            backgroundColor: color ? color : colors.light[900],
            opacity: color ? 0.25 : 1,
          },
        ]}
      />
      <View style={styles.mask} />
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    position: "absolute",
    top: 6,
    height: "100%",
    width: "100%",
    borderRadius: sizes.borderRadius,
    zIndex: -2,
  },
  mask: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: sizes.borderRadius,
    zIndex: -1,
  },
});
