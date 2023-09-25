import { Text, View } from "react-native";
import { router } from "expo-router";

import { Button } from "@/components/Button";
import { Face } from "@/components/Face";
import { Modal } from "@/components/Modal";

import { useUser } from "@/hooks/UserContext";
import { colors } from "@/constants";

import { styles } from "./_modalStyles";

export default function SignOutModal() {
  const { signOut } = useUser();

  return (
    <Modal>
      <View style={styles.modalContentContainer}>
        <View style={{ height: 100 }}>
          <Face mistakesCount={6} />
        </View>

        <Text style={styles.modalTitle}>Deseja sair?</Text>

        <View style={styles.buttonsContainer}>
          <Button flex={1} color={colors.wrong} title="Sim" onPress={signOut} />
          <Button flex={2} title="Não" onPress={router.back} />
        </View>
      </View>
    </Modal>
  );
}
