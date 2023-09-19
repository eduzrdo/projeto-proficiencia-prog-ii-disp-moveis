import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
  const { id } = useLocalSearchParams()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{ fontSize: 36 }}>Produto: {id}</Text>
    </View>
  )
}