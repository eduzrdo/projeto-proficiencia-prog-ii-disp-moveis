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
  width?: DimensionValue;
  icon?: React.FC<SvgProps>;
  loading?: boolean;
};

export const Button = ({
  title,
  width = "100%",
  icon: Icon,
  loading,
  ...rest
}: ButtonProps) => {
  return (
    <View style={[styles.buttonWrapper, { width }]}>
      <TouchableOpacity
        style={[styles.button, { opacity: rest.disabled ? 0.3 : 1 }]}
        activeOpacity={1}
        {...rest}
      >
        {Icon && <Icon />}

        {loading ? (
          <Loading stretch size="small" />
        ) : (
          <Text style={[typography.button, styles.buttonText]}>{title}</Text>
        )}

        {Icon && <View style={{ width: 24, height: 24 }} />}
      </TouchableOpacity>
      <ThickShadow color={rest.disabled ? colors.light["400"] : undefined} />
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
    borderColor: colors.primary[800],
    color: colors.primary[800],
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
});
