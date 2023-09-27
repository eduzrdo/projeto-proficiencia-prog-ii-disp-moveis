import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal as ReactModal,
  ModalProps as ReactModalProps,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import { Input } from "@/components/Input";
import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Button } from "@/components/Button";
import { Info } from "@/components/Info";
import { Avatar } from "@/components/Avatar";

import { useUser } from "@/hooks/UserContext";
import { colors, sizes, typography } from "@/constants";
import { images } from "@/utils/images";

import AtSignIcon from "@/assets/svgs/at-sign-icon.svg";
import KeyIcon from "@/assets/svgs/key-icon.svg";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [avatarModalIsOpen, setAvatarModalIsOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState("42");

  const invalidUsername =
    !username || username.includes(" ") || username.length < 6;
  const invalidPassword =
    !password || password.includes(" ") || password.length < 6;

  const { signUp, loading } = useUser();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    if (invalidUsername || invalidPassword) {
      return;
    }

    const status = await signUp(username, password, selectedAvatar);

    if (status.error) {
      return setError(status.error);
    }

    router.replace("/");
  };

  const toggleAvatarModal = () => {
    setAvatarModalIsOpen(!avatarModalIsOpen);
  };

  const selectAvatar = (avatarNumberString: string) => {
    setSelectedAvatar(avatarNumberString);
    setAvatarModalIsOpen(false);
  };

  useEffect(() => {
    if (!username && !password) {
      return setError("");
    }

    if (username.includes(" ")) {
      return setError(
        "Espaços em branco não são permitidos no nome de usuário."
      );
    } else if (password.includes(" ")) {
      return setError("Espaços em branco não são permitidos na senha.");
    }

    setError("");
  }, [username, password]);

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * 49) + 1;
  }, []);

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

      <View style={{ gap: 10 }}>
        <Info
          type="info"
          message="Seu nome de usuário e sua senha devem conter ao menos 6 caracteres."
        />

        {error && typeof error === "string" && (
          <Info type="alert" message={error} />
        )}
      </View>

      <View style={styles.changeAvatarButtonContainer}>
        <Text style={styles.pickYourAvatarText}>Escolha seu avatar:</Text>
        <Pressable
          style={styles.changeAvatarButton}
          onPress={toggleAvatarModal}
        >
          <Avatar
            source={{
              uri: images(selectedAvatar),
            }}
          />
        </Pressable>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", paddingBottom: 20 }}>
        <Button
          onPress={handleRegister}
          title="Registrar"
          disabled={invalidUsername || invalidPassword}
          loading={loading}
        />
      </View>

      <Modal
        visible={avatarModalIsOpen}
        toggleModal={toggleAvatarModal}
        selectAvatar={selectAvatar}
      />
    </ScreenFrame>
  );
}

type ModalProps = ReactModalProps & {
  toggleModal: () => void;
  selectAvatar: (avatarNumberString: string) => void;
};

const Modal = ({ toggleModal, selectAvatar, ...rest }: ModalProps) => {
  const handleSelectAvatar = (avatarNumber: number) => {
    const aavatarNumberString = avatarNumber.toString().padStart(2, "0");
    selectAvatar(aavatarNumberString);
    toggleModal();
  };

  return (
    <ReactModal
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      {...rest}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          // backgroundColor: "rgba(0, 0, 0, 0.2)",
        }}
      >
        <View
          style={{
            backgroundColor: colors.white,
            height: "70%",
            gap: 20,
            paddingTop: 20,
          }}
        >
          <Text style={[typography.subtitle, { textAlign: "center" }]}>
            Escolha seu avatar:
          </Text>

          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={{
                flexDirection: "row",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 12,
                paddingTop: 10,
                paddingBottom: 20,
                paddingHorizontal: 20,
              }}
            >
              {Array(49)
                .fill("")
                .map((_, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => handleSelectAvatar(index + 1)}
                    >
                      <Avatar
                        source={{
                          uri: images((index + 1).toString().padStart(2, "0")),
                        }}
                      />
                    </Pressable>
                  );
                })}
            </ScrollView>
          </View>
        </View>
      </View>
    </ReactModal>
  );
};

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
    color: colors.light[600],
  },
  changeAvatarButtonContainer: {
    alignItems: "center",
  },
  pickYourAvatarText: {
    ...typography.smallTextSemibold,
    color: colors.light[800],
    marginBottom: 4,
  },
  changeAvatarButton: {
    padding: 4,
    borderWidth: 2,
    borderColor: colors.primary[700],
    borderRadius: sizes.borderRadiusBig,
    borderStyle: "dashed",
  },
});
