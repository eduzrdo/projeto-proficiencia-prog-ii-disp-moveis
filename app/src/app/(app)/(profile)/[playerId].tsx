import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { SvgProps } from "react-native-svg";
import { Link, useLocalSearchParams } from "expo-router";

import { ScreenHeader } from "@/components/ScreenHeader";
import { Avatar } from "@/components/Avatar";
import { Loading } from "@/components/Loading";

import { colors, sizes, typography } from "@/constants";
import { User, useUser } from "@/hooks/UserContext";
import { formatScore } from "@/utils/formatScore";
import { formatDate } from "@/utils/formatDate";
import { api } from "@/utils/axios";

import TrophySmallIcon from "@/assets/svgs/trophy-small-icon.svg";
import GradeIcon from "@/assets/svgs/grade-icon.svg";
import CalendarIcon from "@/assets/svgs/calendar-icon.svg";
import WinIcon from "@/assets/svgs/win-icon.svg";
import DefeatIcon from "@/assets/svgs/defeat-icon.svg";
import PercentageIcon from "@/assets/svgs/percent-icon.svg";
import EraserIcon from "@/assets/svgs/eraser-icon.svg";
import TrashIcon from "@/assets/svgs/trash-icon.svg";
import UnplugIcon from "@/assets/svgs/unplug-icon.svg";
import ShieldCheckIcon from "@/assets/svgs/shield-check-icon.svg";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Profile() {
  const [playerData, setPlayerData] = useState<User>();
  const [error, setError] = useState("");

  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { user, clearUserData } = useUser();

  const handleClearUserData = async () => {
    if (!playerData?.id) return;

    const response = await clearUserData(playerData.id);

    if (response.error) {
      return setError(response.error);
    }

    if (response.data) {
      return setPlayerData(response.data);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${playerId}`);

      setPlayerData(response.data.data);
    })();
  }, []);

  if (!playerData) {
    return <Loading stretch />;
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <ScreenHeader title="" />

          <Link href="/modal" asChild>
            <Pressable hitSlop={20}>
              <UnplugIcon width={24} height={24} stroke={colors.light[800]} />
            </Pressable>
          </Link>
        </View>

        <View style={styles.avatarAndUsernameContainer}>
          <View>
            <Avatar source={playerData.avatar ?? profilePicture} size="big" />

            {playerData.admin && (
              <View style={styles.adminBadge}>
                <ShieldCheckIcon width={20} height={20} fill={colors.white} />
              </View>
            )}
          </View>

          <Text style={typography.title}>{playerData.username}</Text>
        </View>

        <View style={styles.playerDataContainer}>
          <Text style={styles.playerDataContainerTitle}>Dados do Jogador</Text>
          <Stat icon={TrophySmallIcon} value={playerData.wins} />
          <Stat icon={GradeIcon} value={formatScore(playerData.score)} />
          <Stat icon={CalendarIcon} value={formatDate(playerData.createdAt)} />
        </View>

        <View style={styles.playerDataContainer}>
          <Text style={styles.playerDataContainerTitle}>Estatísticas</Text>
          <Stat icon={WinIcon} value={playerData.wins} />
          <Stat icon={DefeatIcon} value={playerData.defeats} />
          <Stat
            icon={PercentageIcon}
            value={
              playerData.games === 0
                ? "0%"
                : ((playerData.wins * 100) / playerData.games)
                    .toFixed(2)
                    .replace(".", ",") + "%"
            }
          />
        </View>

        {user?.admin && (
          <View style={styles.playerDataContainer}>
            <Text style={styles.playerDataContainerTitle}>
              Gerenciar jogador
            </Text>
            <Pressable
              onPress={handleClearUserData}
              style={styles.manageUserButton}
            >
              <EraserIcon width={24} height={24} fill={colors.wrong} />
              <Text style={styles.manageUserButtonText}>Limpar dados</Text>
            </Pressable>
            <Pressable style={styles.manageUserButton}>
              <TrashIcon width={24} height={24} fill={colors.wrong} />
              <Text style={styles.manageUserButtonText}>Excluir conta</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </>
  );
}

type StatProps = {
  icon: React.FC<SvgProps>;
  value: string | number;
};

function Stat({ icon: Icon, value }: StatProps) {
  return (
    <View style={styles.statContainer}>
      <Icon width={24} height={24} fill={colors.light[800]} />
      <Text style={[typography.textSemibold, { color: colors.light[800] }]}>
        {value}
      </Text>
    </View>
  );
}

// function AdminOption();

const styles = StyleSheet.create({
  container: {
    gap: 36,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    //  ,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarAndUsernameContainer: {
    alignItems: "center",
    gap: 20,
  },
  adminBadge: {
    position: "absolute",
    width: 28,
    height: 28,
    top: -12,
    right: -12,
    backgroundColor: colors.primary[700],
    padding: 4,
    borderRadius: 14,
  },
  playerDataContainer: {
    gap: 16,
  },
  manageUserButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  manageUserButtonText: {
    ...typography.textSemibold,
    color: colors.wrong,
  },
  playerDataContainerTitle: {
    ...typography.subtitle,
    color: colors.light[600],
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
