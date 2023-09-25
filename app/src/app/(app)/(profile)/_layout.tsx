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
          name="signOutModal"
          options={{
            presentation: "transparentModal",
            animation: "none",
          }}
        />

        <Stack.Screen
          name="clearUserDataModal"
          options={{
            presentation: "transparentModal",
            animation: "none",
          }}
        />

        <Stack.Screen
          name="deleteUserModal"
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
