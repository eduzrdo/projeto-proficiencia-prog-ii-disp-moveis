import { useEffect } from "react";
import { StyleSheet, Text, View, ColorValue } from "react-native";
import { router } from "expo-router";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { Button } from "@/components/Button";
import { Face } from "@/components/Face";

import { useUser } from "@/hooks/UserContext";
import { colors, typography, sizes } from "@/constants";

export default function Modal() {
  const backgroundColor = useSharedValue("rgba(0, 0, 0, 0)");
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  const { signOut } = useUser();

  useEffect(() => {
    backgroundColor.value = withTiming("rgba(0, 0, 0, 0.15)", {
      duration: 300,
    });

    translateY.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });

    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  return (
    <Animated.View
      style={{
        backgroundColor,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: colors.light["100"],
          borderRadius: sizes.borderRadius,
          width: "100%",
          translateY,
          opacity,
        }}
      >
        <View style={styles.modalContentContainer}>
          <View style={{ height: 100 }}>
            <Face mistakesCount={6} />
          </View>

          <Text style={[typography.title, { color: colors.light["800"] }]}>
            Deseja sair?
          </Text>

          <View style={styles.buttonsContainer}>
            <Button title="SIM" width="40%" onPress={signOut} />
            <Button title="NÃO" width="40%" onPress={router.back} />
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    alignItems: "center",
    gap: 24,
    padding: 24,
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: sizes.borderRadius,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: "center",
  },
});
