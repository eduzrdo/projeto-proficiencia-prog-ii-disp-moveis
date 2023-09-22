import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/constants";

import HomeIcon from "@/assets/svgs/home-icon.svg";
import MedalIcon from "@/assets/svgs/medal-icon.svg";
// import UserSettings from '@/assets/svgs/user-settings-icon.svg';

export default function RootTabsLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            height: 56,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size, focused }) => (
              <HomeIcon
                width={size}
                height={size}
                fill={focused ? colors.primary[700] : colors.light[300]}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="leaderboard"
          options={{
            tabBarIcon: ({ size, focused }) => (
              <MedalIcon
                width={size}
                height={size}
                fill={focused ? colors.primary[700] : colors.light[300]}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="transparent" translucent />
    </>
  );
}
