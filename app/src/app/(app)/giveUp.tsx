import { Modal, View, StyleSheet, Text } from "react-native";
import { router } from "expo-router";

import { Face } from "@/components/Face";
import { Button } from "@/components/Button";

import { colors, typography } from "@/constants";
import { useUser } from "@/hooks/UserContext";

export default function GiveUp() {
  const { loading } = useUser();

  return (
    <Modal>
      <View style={styles.modalContentContainer}>
        <View style={{ height: 100 }}>
          <Face mistakesCount={3} />
        </View>

        <Text style={styles.modalTitle}>Vai desistir?</Text>

        <Text style={styles.modalDescription}>
          Se você desistir, a partida contará como derrota.
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            flex={1}
            color={colors.wrong}
            title="Sim"
            // onPress={() => {}}
            loading={loading}
          />
          <Button flex={2} title="Não" onPress={router.back} />
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
  modalTitle: {
    ...typography.textSemibold,
    color: colors.light[800],
    textAlign: "center",
  },
  modalDescription: {
    ...typography.smallText,
    color: colors.light[800],
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  playerUsername: {
    color: colors.wrong,
  },
});
