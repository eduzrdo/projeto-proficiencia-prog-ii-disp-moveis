import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";

import { colors } from "@/constants";

import FlagIcon from "@/assets/svgs/flag-icon.svg";

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
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
