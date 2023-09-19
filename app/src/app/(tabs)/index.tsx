import { Text, View } from "react-native";
import { Link } from "expo-router";

import { Button } from "@/components/Button";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 36 }}>Início</Text>

      <Link href='/settings' asChild>
        <Button title="Configurações" />
      </Link>
    </View>
  )
}