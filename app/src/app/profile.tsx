import { View, Image, StyleSheet, Text } from "react-native";
import { SvgProps } from "react-native-svg";

import { ScreenFrame } from "@/components/ScreenFrame";
import { Title } from "@/components/Title";

import { colors, sizes } from "@/constants";

import TrophyIcon from "@/assets/svgs/trophy-icon.svg";
import GradeIcon from "@/assets/svgs/grade-icon.svg";
import CalendarIcon from "@/assets/svgs/calendar-icon.svg";
import WinIcon from "@/assets/svgs/win-icon.svg";
import DefeatIcon from "@/assets/svgs/defeat-icon.svg";
import PercentageIcon from "@/assets/svgs/percent-icon.svg";

import profilePicture from "@/assets/images/profile-picture-placeholder.png";

export default function Profile() {
  return (
    <ScreenFrame>
      <Title>Perfil de @eduzrdo</Title>

      <View style={styles.avatarWrapper}>
        <Image source={profilePicture} style={styles.userAvatar} />

        {/* <Text style={styles.userName}>@eduzrdo</Text> */}
      </View>

      <View>
        <Text>Dados do Jogador</Text>
        <Stat icon={TrophyIcon} value={42} />
        <Stat icon={GradeIcon} value={42} />
        <Stat icon={CalendarIcon} value={42} />
        <Stat icon={WinIcon} value={42} />
        <Stat icon={DefeatIcon} value={42} />
        <Stat icon={PercentageIcon} value={42} />
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
    <View>
      <Icon width={24} height={24} fill={colors.light["800"]} />
      <Text>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  userAvatar: { width: 96, height: 96, borderRadius: sizes.borderRadius },
  avatarWrapper: { alignItems: "center" },
  // userName: { fontSize: 20, fontWeight: "700", color: colors.light["800"] },
});
