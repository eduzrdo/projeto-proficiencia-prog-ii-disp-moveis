import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
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
  );
}
