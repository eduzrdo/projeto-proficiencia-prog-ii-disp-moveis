import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[playerId]"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="modal"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
