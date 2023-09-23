import { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Alert } from "react-native";
import { Link, router } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Info } from "@/components/Info";

import { colors, typography } from "@/constants";
import { useUser } from "@/hooks/UserContext";

import HangmanLogotype from "@/assets/svgs/hangman-game-logotype.svg";
import AtSignIcon from "@/assets/svgs/at-sign-icon.svg";
import KeyIcon from "@/assets/svgs/key-icon.svg";
// import GoogleIcon from "@/assets/svgs/google-icon.svg";

export default function SignIn() {
  const [username, setUsername] = useState("user01");
  const [password, setPassword] = useState("121212");
  const [showPassword, setShowPassword] = useState(false);
  const [signInButtonIsDisabled, setSignInButtonIsDisabled] = useState(true);
  const [error, setError] = useState("");

  const { signIn, loading } = useUser();

  const screenWidth = Dimensions.get("screen").width;
  const logotypeScaleFactor = screenWidth / 103.76;
  const logotypeHeight = 43.86 * logotypeScaleFactor;

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    setError("");

    const status = await signIn(username, password);

    if (status.error) {
      return setError(status.error);
    }

    router.replace("/");
  };

  useEffect(() => {
    if (!username || !password) return;

    if (username.length >= 6 && password.length >= 6) {
      setSignInButtonIsDisabled(false);
      return;
    }

    setSignInButtonIsDisabled(true);
  }, [username, password]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

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
        <View style={{ height: 20 }}>
          {error && <Info type="alert" message={error} />}
        </View>

        <Input
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          icon={AtSignIcon}
        />

        <Input
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          icon={KeyIcon}
          showPassword={showPassword}
          togglePassword={togglePassword}
          secureTextEntry={!showPassword}
        />

        <Button
          onPress={handleSignIn}
          title="Entrar"
          disabled={signInButtonIsDisabled}
          loading={loading}
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
        <Link href="/sign-up">
          <Text style={typography.textSemibold}>
            Não possui uma conta?{" "}
            <Text style={styles.link}>Registre-se aqui</Text>
          </Text>
        </Link>

        {/* <Link href="/sign-up">
          <Text style={typography.textSemibold}>Continuar como convidado</Text>
        </Link> */}
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
