import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { colors, sizes } from "@/constants";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  fullWidth?: boolean;
  // icon?: React.ReactNode;
};

export const Button = ({ title, fullWidth, ...rest }: ButtonProps) => {
  return (
    <View style={[styles.buttonWrapper, { width: fullWidth ? '100%' : 300 }]}>
      {/* {Icon && (
        <Icon />
      )} */}

      <TouchableOpacity style={styles.button} activeOpacity={1} {...rest}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>

      <View style={styles.shadow} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 48,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: sizes.borderRadius,
    borderColor: colors.primary[800],
    color: colors.primary[800],
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
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
