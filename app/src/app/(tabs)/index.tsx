import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { Link } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ThickShadow } from "@/components/ThickShadow";
import { Title } from "@/components/Title";

import { colors, sizes, typography } from "@/constants";

import TrophyIcon from "@/assets/svgs/trophy-icon.svg";
import GamepadIcon from "@/assets/svgs/gamepad-icon.svg";
import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Home() {
  return (
    <ScreenFrame>
      <View style={styles.welcomeContainer}>
        <Title>Bom dia, Eduardo!</Title>

        <Link href="/profile" asChild>
          <Pressable>
            <Image source={profilePicture} style={styles.userAvatar} />
          </Pressable>
        </Link>
      </View>

      <View>
        <View style={styles.userScoreContainer}>
          <View style={styles.userScore}>
            <Text style={styles.scoreTitle}>Sua pontuação</Text>
            <Text style={styles.scoreText}>153.902 pontos</Text>
          </View>

          <View
            style={[
              styles.trophyWrapper,
              { backgroundColor: colors.ranks.gold },
            ]}
          >
            <TrophyIcon width={30} height={30} fill={colors.primary[800]} />
          </View>
        </View>

        <ThickShadow />
      </View>

      <View style={styles.bestPlayersContainer}>
        <Text style={typography.subtitle}>Melhores Jogadores</Text>

        {Array(3)
          .fill(0)
          .map((player, index) => (
            <View key={index} style={styles.bestPlayer}>
              <Image source={profilePicture} style={styles.userAvatar} />

              <View style={styles.userScore}>
                <Text style={styles.scoreTitle}>Sua pontuação</Text>
                <Text style={styles.scoreText}>153.902 pontos</Text>
              </View>
            </View>
          ))}
      </View>

      <View style={styles.playButtonContainer}>
        <View style={styles.playButtonWrapper}>
          <Pressable style={styles.playButton}>
            <GamepadIcon width={32} height={32} fill={colors.light["800"]} />
            <Text style={styles.playButtonText}>JOGAR</Text>
          </Pressable>

          <ThickShadow />
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
  userScoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 20,
    width: "100%",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.light[900],
    borderRadius: sizes.borderRadius,
  },
  userScore: {
    flex: 1,
    gap: 8,
  },
  scoreTitle: typography.textGray,
  scoreText: typography.text,
  trophyWrapper: {
    width: 48,
    height: 48,
    borderRadius: sizes.borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  bestPlayersContainer: {
    gap: 20,
  },
  bestPlayer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  playButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonWrapper: {
    width: 140,
    height: 98,
  },
  playButton: {
    height: 98,
    backgroundColor: colors.white,
    borderRadius: sizes.borderRadius,
    borderWidth: 1,
    borderColor: colors.light["800"],
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.light["800"],
  },
});
