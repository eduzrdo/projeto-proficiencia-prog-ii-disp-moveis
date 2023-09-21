import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  DimensionValue,
} from "react-native";
import { SvgProps } from "react-native-svg";

import { ThickShadow } from "./ThickShadow";

import { colors, sizes, typography } from "@/constants";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  width?: DimensionValue;
  icon?: React.FC<SvgProps>;
  isLetterButton?: boolean;
};

export const Button = ({
  icon: Icon,
  title,
  width = 300,
  isLetterButton,
  ...rest
}: ButtonProps) => {
  const buttonPadding = isLetterButton ? 0 : 20;
  width = isLetterButton ? 39 : width;

  return (
    <View style={[styles.buttonWrapper, { width }]}>
      <TouchableOpacity
        style={[styles.button, { paddingHorizontal: buttonPadding }]}
        activeOpacity={1}
        {...rest}
      >
        {Icon && <Icon />}

        <Text style={[typography.button, styles.buttonText]}>{title}</Text>

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
    gap: 20,
    height: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: sizes.borderRadius,
    borderColor: colors.primary[800],
    color: colors.primary[800],
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
});
