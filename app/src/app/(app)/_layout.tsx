import { Redirect, Stack } from "expo-router";

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
    />
  );
}
