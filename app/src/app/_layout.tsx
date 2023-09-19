import { colors } from "@/constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function RootTabsLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.light["100"],
          },
        }}
      >
        <Stack.Screen name="index" />

        <Stack.Screen name="(tabs)" />
      </Stack>

      <StatusBar backgroundColor="transparent" translucent />
    </>
  );
}
