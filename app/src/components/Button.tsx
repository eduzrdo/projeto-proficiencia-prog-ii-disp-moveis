import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  DimensionValue,
} from "react-native";
import { SvgProps } from "react-native-svg";

import { ThickShadow } from "@/components/ThickShadow";
import { Loading } from "@/components/Loading";

import { colors, sizes, typography } from "@/constants";

type ButtonProps = TouchableOpacityProps & {
  title: string;
  icon?: React.FC<SvgProps>;
  flex?: number;
  width?: DimensionValue;
  color?: string;
  loading?: boolean;
};

export const Button = ({
  title,
  icon: Icon,
  flex,
  width = "100%",
  color = colors.light[800],
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <View style={[styles.buttonWrapper, !!flex ? { flex } : { width }]}>
      <TouchableOpacity
        style={[
          styles.button,
          { borderColor: color, opacity: rest.disabled ? 0.3 : 1 },
        ]}
        activeOpacity={1}
        {...rest}
      >
        {Icon && <Icon />}

        {loading ? (
          <Loading stretch size="small" color={color} />
        ) : (
          <Text style={[typography.button, styles.buttonText, { color }]}>
            {title}
          </Text>
        )}

        {Icon && <View style={{ width: 24, height: 24 }} />}
      </TouchableOpacity>
      <ThickShadow disabled={rest.disabled} color={color} />
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
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: sizes.borderRadius,
    borderColor: colors.light[800],
    color: colors.light[800],
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
});
