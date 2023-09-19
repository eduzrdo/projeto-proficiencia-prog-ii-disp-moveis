import { Button, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Profile() {
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