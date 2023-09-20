import { View, Image, StyleSheet, Text } from "react-native";
import { SvgProps } from "react-native-svg";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";

import { colors, sizes, typography } from "@/constants";

import TrophyIcon from "@/assets/svgs/trophy-icon.svg";
import GradeIcon from "@/assets/svgs/grade-icon.svg";
import CalendarIcon from "@/assets/svgs/calendar-icon.svg";
import WinIcon from "@/assets/svgs/win-icon.svg";
import DefeatIcon from "@/assets/svgs/defeat-icon.svg";
import PercentageIcon from "@/assets/svgs/percent-icon.svg";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Profile() {
  const wins = 302;
  const defeats = 36;

  return (
    <ScreenFrame>
      <ScreenHeader title="Perfil de @eduzrdo" />

      <View style={styles.avatarWrapper}>
        <Image source={profilePicture} style={styles.userAvatar} />

        {/* <Text style={styles.userName}>@eduzrdo</Text> */}
      </View>

      <View style={styles.playerDataContainer}>
        <Text style={styles.playerDataContainerTitle}>Dados do Jogador</Text>
        <Stat icon={TrophyIcon} value={42} />
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
      <Text style={typography.subtitle}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userAvatar: { width: 96, height: 96, borderRadius: sizes.borderRadius },
  avatarWrapper: { alignItems: "center" },
  // userName: { fontSize: 20, fontWeight: "700", color: colors.light["800"] },
  playerDataContainer: {
    gap: 20,
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
