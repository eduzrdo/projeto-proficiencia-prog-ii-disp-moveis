import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootTabsLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />

        <Stack.Screen name="(tabs)" />
      </Stack>

      <StatusBar backgroundColor="transparent" translucent />
    </>
  );
}
