import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { Link } from "expo-router";

import { Avatar } from "./Avatar";

import { colors, sizes, typography } from "@/constants";
import { images } from "@/utils/images";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

type PlayerCardProps = {
  playerId: string;
  avatar?: string | null;
  playerUsername: string;
  rankPosition: number;
  score: number;
};

export const PlayerCard = ({
  playerId,
  avatar,
  playerUsername,
  rankPosition,
  score,
}: PlayerCardProps) => {
  const imageSource = avatar ? { uri: images(avatar) } : profilePicture;

  return (
    <Link href={`/(app)/(profile)/${playerId}`} asChild>
      <TouchableNativeFeedback>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
          }}
        >
          <View
            style={[
              styles.avatarAndRankPosition,
              {
                backgroundColor:
                  rankPosition <= 3 ? colors.ranks[rankPosition - 1] : "#fff",
              },
            ]}
          >
            <Avatar source={imageSource} />
            <Text
              style={[typography.subtitle, { width: 50, textAlign: "center" }]}
            >
              {rankPosition}
            </Text>
          </View>

          <View style={styles.userScore}>
            <Text style={styles.playerUsername}>{playerUsername}</Text>
            <Text style={styles.lowOrderText}>{score} pontos</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </Link>
  );
};

const styles = StyleSheet.create({
  userScore: {
    flex: 1,
    gap: 4,
  },
  playerName: {
    ...typography.textSemibold,
    color: colors.light[800],
  },
  avatarAndRankPosition: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: sizes.borderRadius,
  },
  playerUsername: {
    ...typography.textSemibold,
  },
  lowOrderText: {
    ...typography.smallText,
    color: colors.light[600],
  },
});
