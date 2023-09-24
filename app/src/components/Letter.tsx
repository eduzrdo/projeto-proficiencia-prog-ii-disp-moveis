import { StyleSheet, Text, View } from "react-native";

import { colors, sizes } from "@/constants";

type LetterProps = {
  letter: string;
};

export const Letter = ({ letter }: LetterProps) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.letter}>{letter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    width: 36,
    borderRadius: sizes.borderRadius,
    borderWidth: 1,
    borderColor: colors.light[800],
    backgroundColor: colors.white,
  },
  letter: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    textAlign: "center",
  },
});
