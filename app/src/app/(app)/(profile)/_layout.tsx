import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function ProfileLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="modal"
          options={{
            presentation: "transparentModal",
            animation: "none",
          }}
        />
      </Stack>

      <StatusBar backgroundColor="transparent" translucent />
    </>
  );
}
