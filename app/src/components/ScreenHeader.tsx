import { Pressable, Text, View } from "react-native";
import { useNavigation } from "expo-router";

import { Title } from "./Title";

type ScreenHeaderProps = {
  title: string;
};

export const ScreenHeader = ({ title }: ScreenHeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Pressable onPress={navigation.goBack}>
        <Text>VOLTAR</Text>
      </Pressable>

      <Title>{title}</Title>
    </View>
  );
};
