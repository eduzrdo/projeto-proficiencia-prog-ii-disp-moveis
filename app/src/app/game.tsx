import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Letter } from "@/components/Letter";
import { Button } from "@/components/Button";

import { colors } from "@/constants";
import { letters } from "@/utils/letters";

import FlagIcon from "@/assets/svgs/flag-icon.svg";
import Face1 from "@/assets/svgs/face_1.svg";

export default function Game() {
  const navigation = useNavigation();

  return (
    <ScreenFrame>
      <View style={styles.header}>
        <ScreenHeader hideBackButton title="Descubra a palavra" />

        <Pressable onPress={navigation.goBack} hitSlop={20}>
          <FlagIcon fill={colors.light["800"]} />
        </Pressable>
      </View>

      <View style={styles.lettersContainer}>
        <Letter letter="D" />
        <Letter letter="E" />
        <Letter letter="S" />
        <Letter letter="E" />
        <Letter letter="N" />
        <Letter letter="V" />
        <Letter letter="O" />
        <Letter letter="L" />
        <Letter letter="V" />
        <Letter letter="I" />
        <Letter letter="M" />
        <Letter letter="E" />
        <Letter letter="N" />
        <Letter letter="T" />
        <Letter letter="O" />
      </View>

      <View style={styles.faceWrapper}>
        <Face1 height="100%" fill={colors.light["800"]} />
        {/* <Face1 width={72} height={72 * 1.66} fill={colors.light["800"]} /> */}
      </View>

      <View style={styles.keyboard}>
        {letters.map((letter) => (
          <Button key={letter} isLetterButton title={letter} width={39} />
        ))}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lettersContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  faceWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    paddingBottom: 20,
  },
});
