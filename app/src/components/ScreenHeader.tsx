import { Pressable, View } from "react-native";
import { useNavigation } from "expo-router";

import { Title } from "@/components/Title";

import { colors } from "@/constants";

import ArrowLeftIcon from "@/assets/svgs/arrow-left-icon.svg";

type ScreenHeaderProps = {
  title: string;
  hideBackButton?: boolean;
};

export const ScreenHeader = ({ title, hideBackButton }: ScreenHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
      }}
    >
      {!hideBackButton && (
        <Pressable onPress={navigation.goBack} hitSlop={20}>
          <ArrowLeftIcon width={24} height={24} fill={colors.light["800"]} />
        </Pressable>
      )}

      <Title>{title}</Title>
    </View>
  );
};
