import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { SvgProps } from "react-native-svg";
import { Link, useLocalSearchParams } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Avatar } from "@/components/Avatar";
import { Loading } from "@/components/Loading";

import { colors, typography } from "@/constants";
import { User, useUser } from "@/hooks/UserContext";
import { formatScore } from "@/utils/formatScore";
import { api } from "@/utils/axios";

import TrophySmallIcon from "@/assets/svgs/trophy-small-icon.svg";
import GradeIcon from "@/assets/svgs/grade-icon.svg";
import CalendarIcon from "@/assets/svgs/calendar-icon.svg";
import WinIcon from "@/assets/svgs/win-icon.svg";
import DefeatIcon from "@/assets/svgs/defeat-icon.svg";
import PercentageIcon from "@/assets/svgs/percent-icon.svg";
import UnplugIcon from "@/assets/svgs/unplug-icon.svg";

import SettingsIcon from "@/assets/svgs/settings-icon.svg";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Profile() {
  const [playerData, setPlayerData] = useState<User>();

  const { playerId } = useLocalSearchParams<{ playerId: string }>();
  const { user, signOut } = useUser();

  useEffect(() => {
    (async () => {
      const response = await api.get(`/user/${playerId}`);

      setPlayerData(response.data.data);
    })();
  }, []);

  if (!playerData || !user) {
    return <Loading stretch />;
  }

  return (
    <ScreenFrame>
      <View style={styles.header}>
        <ScreenHeader title={`Perfil de ${playerData.username}`} />

        {/* {user.id === playerId && (
          <Pressable onPress={signOut} hitSlop={20}>
            <UnplugIcon width={24} height={24} stroke={colors.light["800"]} />
          </Pressable>
        )} */}

        <Link href="/modal">MODAL</Link>
      </View>

      <View style={styles.avatarWrapper}>
        <Avatar source={playerData.avatar ?? profilePicture} size="big" />
      </View>

      <View style={styles.playerDataContainer}>
        <Text style={styles.playerDataContainerTitle}>Dados do Jogador</Text>
        <Stat icon={TrophySmallIcon} value={playerData.wins} />
        <Stat icon={GradeIcon} value={formatScore(playerData.score)} />
        {/* <Stat icon={CalendarIcon} value="14/09/2023" /> */}
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
    </ScreenFrame>
  );
}

type StatProps = {
  icon: React.FC<SvgProps>;
  value: string | number;
};

function Stat({ icon: Icon, value }: StatProps) {
  return (
    <View style={styles.statContainer}>
      <Icon width={24} height={24} fill={colors.light["800"]} />
      <Text style={typography.textSemibold}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatarWrapper: {
    alignItems: "center",
  },
  // userName: { fontSize: 20, fontWeight: "700", color: colors.light["800"] },
  playerDataContainer: {
    gap: 16,
  },
  playerDataContainerTitle: {
    ...typography.subtitle,
    color: colors.light["600"],
  },
  statContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
