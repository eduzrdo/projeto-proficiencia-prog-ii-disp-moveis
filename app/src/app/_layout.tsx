import { useCallback } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";

import { UserContextProvider } from "@/hooks/UserContext";
import { StatusBar } from "expo-status-bar";

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
    <UserContextProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <StatusBar backgroundColor="transparent" translucent />
    </UserContextProvider>
  );
}
