import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { Input } from "@/components/Input";
import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/Button";

import { colors, typography } from "@/constants";

import AtSignIcon from "@/assets/svgs/at-sign-icon.svg";
import KeyIcon from "@/assets/svgs/key-icon.svg";
import InfoIcon from "@/assets/svgs/info-icon.svg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [registerButtonIsDisabled, setRegisterButtonIsDisabled] =
    useState(true);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (!username || !password) return;

    if (username.length >= 6 && password.length >= 6) {
      setRegisterButtonIsDisabled(false);
      return;
    }

    setRegisterButtonIsDisabled(true);
  }, [username, password]);

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

      <View style={styles.registerInfo}>
        <InfoIcon width={16} height={16} fill={colors.primary["700"]} />
        <Text style={styles.registerInfoText}>
          Seu nome de usuário e sua senha devem conter ao menos 6 caracteres.
        </Text>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <Button title="Registrar" disabled={registerButtonIsDisabled} />
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
