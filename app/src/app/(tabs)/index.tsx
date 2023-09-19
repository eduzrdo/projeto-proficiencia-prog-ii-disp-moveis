import { Text, View, StyleSheet, Image } from "react-native";

import { ScreenFrame } from "@/components/ScreenFrame";
import { sizes } from "@/constants";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Home() {
  return (
    <ScreenFrame>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Bom dia, Eduardo!</Text>

        <Image source={profilePicture} style={styles.userAvatar} />
      </View>

      <View>
        <View>
          <Text>Sua pontuação</Text>
          <Text>153.902 pontos</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "600",
  },
  userAvatar: { width: 56, height: 56, borderRadius: sizes.borderRadius },
});
