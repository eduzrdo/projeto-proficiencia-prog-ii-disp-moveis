import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import { Link } from "expo-router";

import { Avatar } from "./Avatar";

import { colors, sizes, typography } from "@/constants";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

type PlayerCardProps = {
  playerId: string;
  avatarUrl?: string;
  playerName?: string;
  rank: number;
  score: number;
};

export const PlayerCard = ({
  playerId,
  avatarUrl,
  playerName,
  rank,
  score,
}: PlayerCardProps) => {
  const imageSource = avatarUrl ? { uri: avatarUrl } : profilePicture;

  return (
    <Link href={`/profile/${playerId}`} asChild>
      <TouchableNativeFeedback>
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
            <Text
              style={[typography.subtitle, { width: 50, textAlign: "center" }]}
            >
              {rank}
            </Text>
          </View>

          <View style={styles.userScore}>
            {playerName ? (
              <>
                <Text style={typography.textSemibold}>{playerName}</Text>
                <Text style={styles.lowOrderText}>{score} pontos</Text>
              </>
            ) : (
              <>
                <Text style={styles.lowOrderText}>Sua pontuação</Text>
                <Text style={typography.textSemibold}>{score} pontos</Text>
              </>
            )}
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
    color: colors.light["800"],
  },
  lowOrderText: {
    ...typography.smallText,
    color: colors.light["600"],
  },
});
