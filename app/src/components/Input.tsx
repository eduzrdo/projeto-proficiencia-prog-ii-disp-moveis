import React, { ComponentProps } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { SvgProps } from "react-native-svg";

import EyeIcon from "@/assets/svgs/eye-icon.svg";
import EyeOffIcon from "@/assets/svgs/eye-off-icon.svg";

import { colors, sizes, typography } from "@/constants";

type InputProps = ComponentProps<typeof TextInput> & {
  icon?: React.FC<SvgProps>;
  showPassword?: boolean;
  togglePassword?: () => void;
};

export const Input = ({
  icon: Icon,
  showPassword,
  togglePassword,
  ...rest
}: InputProps) => {
  return (
    <View style={styles.inputWrapper}>
      {Icon && <Icon fill={colors.light["400"]} />}

      <TextInput
        placeholderTextColor={colors.light["400"]}
        style={styles.inputField}
        keyboardAppearance="dark"
        {...rest}
      />

      {rest.secureTextEntry !== undefined && (
        <Pressable onPress={togglePassword} hitSlop={20}>
          {showPassword ? (
            <EyeIcon width={24} height={24} fill={colors.primary["600"]} />
          ) : (
            <EyeOffIcon width={24} height={24} fill={colors.light["400"]} />
          )}
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    borderRadius: sizes.borderRadius,
    backgroundColor: colors.white,
  },
  inputField: {
    ...typography.text,
    paddingVertical: 12,
    flex: 1,
  },
});
