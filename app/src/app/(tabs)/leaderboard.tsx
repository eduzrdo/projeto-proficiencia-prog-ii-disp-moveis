import { Text, View } from "react-native";
import { Link } from "expo-router";

import { Button } from "@/components/Button";

export default function Leaderboard() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 36 }}>Perfil</Text>

      <Link
        href='/product/7'
        asChild
      >
        <Button title="Produto 7" />
      </Link>
    </View>
  )
}