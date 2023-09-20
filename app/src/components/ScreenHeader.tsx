import { Pressable, View } from "react-native";
import { useNavigation } from "expo-router";

import { Title } from "@/components/Title";

import { colors } from "@/constants";

import ArrowLeftIcon from "@/assets/svgs/arrow-left-icon.svg";

type ScreenHeaderProps = {
  title: string;
};

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <Pressable onPress={navigation.goBack}>
        <ArrowLeftIcon width={24} height={24} fill={colors.light["800"]} />
      </Pressable>

      <Title>{title}</Title>
    </View>
  );
};
