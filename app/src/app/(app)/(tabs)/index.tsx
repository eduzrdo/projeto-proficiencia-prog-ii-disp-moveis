import { useCallback, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView } from "react-native";
import { Link, useFocusEffect } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ThickShadow } from "@/components/ThickShadow";
import { Title } from "@/components/Title";
import { Avatar } from "@/components/Avatar";
import { PlayerCard } from "@/components/PlayerCard";
import { Loading } from "@/components/Loading";

import { colors, sizes, typography } from "@/constants";
import { User, useUser } from "@/hooks/UserContext";
import { api } from "@/utils/api";
import { formatScore } from "@/utils/formatScore";

import TrophyIcon from "@/assets/svgs/trophy-icon.svg";
import GamepadIcon from "@/assets/svgs/gamepad-icon.svg";
import profilePicture from "@/assets/images/profile-picture-placeholder.png";
import { images } from "@/utils/images";

export default function Home() {
  const [top3players, setTop3players] = useState<User[]>([]);

  const { user } = useUser();

  if (!user) return <Loading stretch />;

  const updateTop3players = async () => {
    const top3playersResponse = await api.get("/user?amount=3");

    setTop3players(top3playersResponse.data.data);
  };

  useFocusEffect(
    useCallback(() => {
      updateTop3players();
    }, [])
  );

  return (
    <ScreenFrame>
      <View style={styles.welcomeContainer}>
        <Title>Olá, {user.username}!</Title>

        <Link href={`/(app)/(profile)/${user.id}`} asChild>
          <Pressable>
            <Avatar
              source={
                user.avatar
                  ? {
                      uri: images(user.avatar),
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
            <Text style={typography.subtitle}>
              {formatScore(user.score)} pontos
            </Text>
          </View>

          {/* <View
            style={[styles.trophyWrapper, { backgroundColor: colors.ranks[1] }]}
          >
            <TrophyIcon width={30} height={30} fill={colors.light[800]} />
          </View> */}
        </View>

        <ThickShadow />
      </View>

      <View style={styles.bestPlayersContainer}>
        <Text style={typography.subtitle}>Melhores Jogadores</Text>

        <ScrollView contentContainerStyle={styles.bestPlayerContent}>
          {top3players.map((player, index) => (
            <PlayerCard
              key={player.id}
              playerId={player.id}
              rankPosition={index + 1}
              playerUsername={player.username}
              avatar={player.avatar}
              score={player.score}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.playButtonContainer}>
        <View style={styles.playButtonWrapper}>
          <Link href="/game" asChild>
            <Pressable style={styles.playButton}>
              <GamepadIcon width={32} height={32} stroke={colors.light[800]} />
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
    ...typography.smallText,
    color: colors.light[600],
  },
  trophyWrapper: {
    width: 48,
    height: 48,
    borderRadius: sizes.borderRadius,
    justifyContent: "center",
    alignItems: "center",
  },
  bestPlayersContainer: {
    flex: 1,
    gap: 20,
  },
  bestPlayerContent: {
    gap: 20,
  },
  playButtonContainer: {
    paddingBottom: 40,
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
    borderColor: colors.light[800],
    justifyContent: "center",
    alignItems: "center",
  },
  playButtonText: {
    ...typography.textSemibold,
    fontSize: 20,
  },
});
