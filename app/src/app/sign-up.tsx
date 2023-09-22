import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Alert, StyleSheet, Text, View } from "react-native";

import { Input } from "@/components/Input";
import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/Button";
import { Info } from "@/components/Info";

import { useUser } from "@/hooks/UserContext";
import { colors, typography } from "@/constants";

import AtSignIcon from "@/assets/svgs/at-sign-icon.svg";
import KeyIcon from "@/assets/svgs/key-icon.svg";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerButtonIsDisabled, setRegisterButtonIsDisabled] =
    useState(true);
  const [error, setError] = useState("");

  const { signUp, loading } = useUser();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    setError("");

    const status = await signUp(username, password);

    if (status.error) {
      return setError(status.error);
    }

    router.replace("/");
  };

  useEffect(() => {
    if (!username || !password) return;

    if (username.length >= 6 && password.length >= 6) {
      setRegisterButtonIsDisabled(false);
      return;
    }

    setRegisterButtonIsDisabled(true);
  }, [username, password]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return (
    <ScreenFrame>
      <ScreenHeader title="Registrar" />

      <View style={styles.formContainer}>
        <Input
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          icon={AtSignIcon}
          autoFocus
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
      </View>

      <Info
        type="info"
        message="Seu nome de usuário e sua senha devem conter ao menos 6 caracteres."
      />

      {error && <Info type="alert" message={error} />}

      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <Button
          onPress={handleRegister}
          title="Registrar"
          disabled={registerButtonIsDisabled}
          loading={loading}
        />
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  registerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  registerInfoText: {
    ...typography.smallText,
    flex: 1,
    color: colors.light["600"],
  },
});
