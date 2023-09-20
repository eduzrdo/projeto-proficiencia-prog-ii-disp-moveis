import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { SvgProps } from "react-native-svg";

import { ThickShadow } from "./ThickShadow";

import { colors, sizes, typography } from "@/constants";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  fullWidth?: boolean;
  icon?: React.FC<SvgProps>;
};

export const Button = ({
  title,
  icon: Icon,
  fullWidth,
  ...rest
}: ButtonProps) => {
  return (
    <View style={[styles.buttonWrapper, { width: fullWidth ? "100%" : 300 }]}>
      <TouchableOpacity style={styles.button} activeOpacity={1} {...rest}>
        {Icon && <Icon />}

        <Text style={typography.button}>{title}</Text>

        {Icon && <View style={{ width: 24, height: 24 }} />}
      </TouchableOpacity>
      <ThickShadow />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 48,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 20,
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: sizes.borderRadius,
    borderColor: colors.primary[800],
    color: colors.primary[800],
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
