import { View, Text, Dimensions, StyleSheet } from "react-native";
import {
  Link,
  // useNavigation
} from "expo-router";

import { Button } from "@/components/Button";
import { colors, typography } from "@/constants";

import HangmanLogotype from "@/assets/svgs/hangman-game-logotype.svg";
import GoogleIcon from "@/assets/svgs/google-icon.svg";

export default function Home() {
  const screenWidth = Dimensions.get("screen").width;
  const logotypeScaleFactor = screenWidth / 103.76;
  const logotypeHeight = 43.86 * logotypeScaleFactor;

  // const navigation = useNavigation();

  const handleLogin = () => {
    // navigation.navigate('(tabs)', {
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <HangmanLogotype
          width={screenWidth - 60}
          height={logotypeHeight}
          fill={colors.primary[800]}
        />
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          width="100%"
          icon={GoogleIcon}
          onPress={handleLogin}
          title="Login com o Google"
        />

        <Link href="/(tabs)">
          <Text style={typography.textSemibold}>Continuar como convidado</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  guestText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
