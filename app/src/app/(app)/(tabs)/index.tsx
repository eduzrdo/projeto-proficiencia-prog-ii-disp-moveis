import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ThickShadow } from "@/components/ThickShadow";
import { Title } from "@/components/Title";
import { Avatar } from "@/components/Avatar";
import { PlayerCard } from "@/components/PlayerCard";
import { Loading } from "@/components/Loading";

import { colors, sizes, typography } from "@/constants";
import { User, useUser } from "@/hooks/UserContext";
import { api } from "@/utils/axios";

import TrophyIcon from "@/assets/svgs/trophy-icon.svg";
import GamepadIcon from "@/assets/svgs/gamepad-icon.svg";
import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Home() {
  const [top3players, setTop3players] = useState<User[]>([]);

  const { user } = useUser();

  if (!user) return <Loading stretch />;

  useEffect(() => {
    (async () => {
      const top3playersResponse = await api.get("/user?amount=3");

      setTop3players(top3playersResponse.data.data);
    })();
  }, []);

  return (
    <ScreenFrame>
      <View style={styles.welcomeContainer}>
        <Title>Bom dia, Eduardo!</Title>

        <Link href={`/profile/${user.id}`} asChild>
          <Pressable>
            <Avatar
              source={
                user.avatar
                  ? {
                      uri: user.avatar,
                    }
                  : profilePicture
              }
            />
          </Pressable>
        </Link>
      </View>

      <View>
        <View style={styles.userScoreContainer}>
          <View style={styles.userScore}>
            <Text style={styles.scoreTitle}>Sua pontuação</Text>
            <Text style={typography.textSemibold}>153.902 pontos</Text>
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

        {top3players.map((player, index) => (
          <PlayerCard
            key={player.id}
            playerId={player.id}
            rank={index + 1}
            playerUsername={player.username}
            avatarUrl={player.avatar}
            score={player.score}
          />
        ))}
      </View>

      <View style={styles.playButtonContainer}>
        <View style={styles.playButtonWrapper}>
          <Link href="/game" asChild>
            <Pressable style={styles.playButton}>
              <GamepadIcon width={32} height={32} fill={colors.light["800"]} />
              <Text style={styles.playButtonText}>JOGAR</Text>
            </Pressable>
          </Link>
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
  scoreTitle: {
    ...typography.text,
    color: colors.light["600"],
  },
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
    ...typography.textSemibold,
    fontSize: 20,
  },
});
