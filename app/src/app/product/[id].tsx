import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Home() {
  const { id } = useLocalSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 5 }}>
      <Text style={{ fontSize: 36 }}>Produto: {id}</Text>
    </View>
  )
}