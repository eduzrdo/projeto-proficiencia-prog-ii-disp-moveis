import { Redirect, Slot, Stack } from "expo-router";

import { useUser } from "@/hooks/UserContext";

export default function AppLayout() {
  const { user } = useUser();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(profile)"
        options={{
          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="gameResultModal"
        options={{
          presentation: "transparentModal",
          animation: "none",
        }}
      />
    </Stack>
  );
}
