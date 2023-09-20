import { useCallback } from "react";
import { colors } from "@/constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Text, View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // // TO BE REMOVED, use splash screen instead
  // if (!fontsLoaded) {
  //   return (
  //     <View onLayout={onLayoutRootView}>
  //       <Text>Carregando fontes</Text>
  //     </View>
  //   );
  // }

  if (!fontsLoaded) {
    return null;
  }

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
