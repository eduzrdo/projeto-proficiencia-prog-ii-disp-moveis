import { colors, sizes, typography } from "@/constants";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "./Avatar";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

type PlayerCardProps = {
  avatarUrl?: string;
  rank: number;
};

export const PlayerCard = ({ avatarUrl, rank }: PlayerCardProps) => {
  const imageSource = avatarUrl ? { uri: avatarUrl } : profilePicture;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.white,
          borderRadius: sizes.borderRadius,
        }}
      >
        <Avatar source={imageSource} />
        <Text style={[typography.subtitle, { padding: 10 }]}>42</Text>
      </View>

      <View style={styles.userScore}>
        <Text style={styles.scoreTitle}>Sua pontuação</Text>
        <Text style={typography.textSemibold}>153.902 pontos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userScore: {
    flex: 1,
    gap: 8,
  },
  scoreTitle: {
    ...typography.text,
    color: colors.light["600"],
  },
});
