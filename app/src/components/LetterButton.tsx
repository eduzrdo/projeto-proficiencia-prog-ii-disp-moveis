import { useState } from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import { ThickShadow } from "./ThickShadow";

import { colors, sizes, typography } from "@/constants";

type LetterButtonProps = TouchableOpacityProps & {
  letter: string;
  colorFeedback: "correct" | "wrong";
  disable: boolean;
};

export const LetterButton = ({
  letter,
  colorFeedback,
  disable,
  onPress,
  ...rest
}: LetterButtonProps) => {
  const [disabled, setDisabled] = useState(false);

  const color = colorFeedback === "correct" ? colors.correct : colors.wrong;

  const handleOnPress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event);
    }
    setDisabled(true);
  };

  return (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            opacity: disabled ? 0.25 : 1,
            borderColor: disabled ? color : colors.light[800],
          },
        ]}
        activeOpacity={1}
        onPress={disable ? () => {} : handleOnPress}
        disabled={disabled}
        hitSlop={10}
        {...rest}
      >
        <Text
          style={[
            typography.button,
            styles.buttonText,
            { color: disabled ? color : colors.light[800] },
          ]}
        >
          {letter}
        </Text>
      </TouchableOpacity>

      <ThickShadow color={disabled ? color : undefined} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: 39,
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
    color: colors.light[800],
  },
  buttonText: {
    flex: 1,
    textAlign: "center",
  },
});
