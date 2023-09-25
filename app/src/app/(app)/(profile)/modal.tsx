import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/Button";
import { Face } from "@/components/Face";
import { Modal } from "@/components/Modal";

import { useUser } from "@/hooks/UserContext";
import { colors, typography, sizes } from "@/constants";

export default function ModalScreen() {
  const { signOut } = useUser();

  return (
    <Modal>
      <View style={styles.modalContentContainer}>
        <View style={{ height: 100 }}>
          <Face mistakesCount={6} />
        </View>

        <Text style={[typography.title, { color: colors.light[800] }]}>
          Deseja sair?
        </Text>

        <View style={styles.buttonsContainer}>
          <Button title="SIM" width="40%" onPress={signOut} />
          <Button title="NÃO" width="40%" onPress={router.back} />
        </View>
      </View>
    </Modal>
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
