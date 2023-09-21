import { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import {
  Link,
  // useNavigation
} from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import { colors, typography } from "@/constants";

import HangmanLogotype from "@/assets/svgs/hangman-game-logotype.svg";
import AtSignIcon from "@/assets/svgs/at-sign-icon.svg";
import KeyIcon from "@/assets/svgs/key-icon.svg";
// import GoogleIcon from "@/assets/svgs/google-icon.svg";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const screenWidth = Dimensions.get("screen").width;
  const logotypeScaleFactor = screenWidth / 103.76;
  const logotypeHeight = 43.86 * logotypeScaleFactor;

  // const navigation = useNavigation();

  const handleLogin = () => {
    // navigation.navigate('(tabs)', {
    // });
  };

  return (
    <ScreenFrame>
      <View style={styles.logoWrapper}>
        <HangmanLogotype
          width={screenWidth - 60}
          height={logotypeHeight}
          fill={colors.primary[800]}
        />
      </View>

      <View style={styles.formContainer}>
        <Input
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          icon={AtSignIcon}
        />

        <Input
          placeholder="Senha"
          value={username}
          onChangeText={setUsername}
          icon={KeyIcon}
        />

        <Button
          // icon={GoogleIcon}
          onPress={handleLogin}
          title="Entrar"
        />
      </View>

      <View style={styles.separator}>
        <View style={styles.separatorLine} />
        <Text
          style={[
            typography.smallText,
            { color: colors.light["400"], lineHeight: 14 },
          ]}
        >
          ou
        </Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.otherAuthenticationOptions}>
        <Link href="/register">
          <Text style={typography.textSemibold}>
            Não possui uma conta?{" "}
            <Text style={styles.link}>Registre-se aqui</Text>
          </Text>
        </Link>

        <Link href="/(tabs)">
          <Text style={typography.textSemibold}>Continuar como convidado</Text>
        </Link>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logoWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  guestText: {
    fontSize: 16,
    fontWeight: "600",
  },
  separator: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  separatorLine: {
    width: 20,
    height: 1,
    backgroundColor: colors.light["400"],
  },
  otherAuthenticationOptions: {
    alignItems: "center",
    gap: 20,
    paddingBottom: 20,
  },
  link: {
    color: colors.primary["600"],
    textDecorationLine: "underline",
  },
});
