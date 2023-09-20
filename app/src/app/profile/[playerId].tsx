import { View, Image, StyleSheet, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import { useLocalSearchParams } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Avatar } from "@/components/Avatar";

import { colors, typography } from "@/constants";

import TrophySmallIcon from "@/assets/svgs/trophy-small-icon.svg";
import GradeIcon from "@/assets/svgs/grade-icon.svg";
import CalendarIcon from "@/assets/svgs/calendar-icon.svg";
import WinIcon from "@/assets/svgs/win-icon.svg";
import DefeatIcon from "@/assets/svgs/defeat-icon.svg";
import PercentageIcon from "@/assets/svgs/percent-icon.svg";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Profile() {
  const wins = 302;
  const defeats = 36;

  const { playerId } = useLocalSearchParams();

  return (
    <ScreenFrame>
      <ScreenHeader title="Perfil de @eduzrdo" />

      <View style={styles.avatarWrapper}>
        <Avatar source={profilePicture} size="big" />

        {/* <Text style={typography.smallText}>{playerId}</Text> */}
      </View>

      <View style={styles.playerDataContainer}>
        <Text style={styles.playerDataContainerTitle}>Dados do Jogador</Text>
        <Stat icon={TrophySmallIcon} value={42} />
        <Stat icon={GradeIcon} value={150201} />
        <Stat icon={CalendarIcon} value="14/09/2023" />
      </View>

      <View style={styles.playerDataContainer}>
        <Text style={styles.playerDataContainerTitle}>Estatísticas</Text>
        <Stat icon={WinIcon} value={wins} />
        <Stat icon={DefeatIcon} value={defeats} />
        <Stat
          icon={PercentageIcon}
          value={
            (100 - (defeats * 100) / wins).toFixed(2).replace(".", ",") + "%"
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
