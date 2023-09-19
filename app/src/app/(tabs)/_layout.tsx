import { Tabs } from "expo-router";
import { MaterialIcons } from '@expo/vector-icons'

export default function RootTabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Início',
          tabBarIcon: ({ size, focused }) => <MaterialIcons name='home' size={size} color={focused ? '#008870' : '#cfcfcf'} />
        }}
      />  

      <Tabs.Screen
        name='profile'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, focused }) => <MaterialIcons name='person' size={size} color={focused ? '#008870' : '#cfcfcf'} />
        }}
      />

      <Tabs.Screen
        name='settings'
        options={{
          title: 'Perfil',
          tabBarIcon: ({ size, focused }) => <MaterialIcons name='settings' size={size} color={focused ? '#008870' : '#cfcfcf'} />
        }}
      />
    </Tabs>
  )
}