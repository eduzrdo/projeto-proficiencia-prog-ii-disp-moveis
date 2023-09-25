import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/Button";
import { Face } from "@/components/Face";
import { Modal } from "@/components/Modal";

import { useUser } from "@/hooks/UserContext";
import { colors, typography } from "@/constants";

import { styles } from "./_modalStyles";

export default function DeleteUserModal() {
  const { clearUserData, loading } = useUser();

  const { playerId, playerUsername } = useLocalSearchParams<{
    playerId: string;
    playerUsername: string;
  }>();

  const handleClearUserData = async () => {
    await clearUserData(playerId);
    router.back();
  };

  return (
    <Modal>
      <View style={styles.modalContentContainer}>
        <View style={{ height: 100 }}>
          <Face mistakesCount={4} />
        </View>

        <Text
          style={[
            typography.title,
            { color: colors.light[800], textAlign: "center" },
          ]}
        >
          Excluir conta de{" "}
          <Text style={styles.playerUsername}>{playerUsername}</Text>?
        </Text>

        <View style={styles.buttonsContainer}>
          <Button
            flex={1}
            color={colors.wrong}
            title="Sim"
            onPress={handleClearUserData}
            loading={loading}
          />
          <Button flex={2} title="Não" onPress={router.back} />
        </View>
      </View>
    </Modal>
  );
}
