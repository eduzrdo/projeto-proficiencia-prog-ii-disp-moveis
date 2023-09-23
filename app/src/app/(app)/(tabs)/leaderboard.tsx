import { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { PlayerCard } from "@/components/PlayerCard";
import { Input } from "@/components/Input";

import { User } from "@/hooks/UserContext";
import { colors, sizes, typography } from "@/constants";
import { api } from "@/utils/axios";

import MagnifyingGlassIcon from "@/assets/svgs/magnifying-glass-icon.svg";

export default function Leaderboard() {
  const [topPlayers, setTopPlayers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlayers = topPlayers.filter((player) =>
    player.username.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  useEffect(() => {
    (async () => {
      const top3playersResponse = await api.get("/user?amount=100");

      setTopPlayers(top3playersResponse.data.data);
    })();
  }, []);

  return (
    <ScreenFrame>
      <ScreenHeader title="Melhores Jogadores" />

      <Input
        placeholder="Buscar jogadores"
        value={searchQuery}
        onChangeText={setSearchQuery}
        icon={MagnifyingGlassIcon}
      />

      <View style={styles.flatListContainer}>
        <FlatList
          data={filteredPlayers}
          renderItem={({ item }) => (
            <PlayerCard
              // key={item.id}
              playerId={item.id}
              // rank={item.rank}
              avatarUrl={item.avatar}
              playerUsername={item.username}
              score={item.score}
            />
          )}
          keyExtractor={(player) => String(player.id)}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingVertical: 20,
    gap: 20,
  },
  searcFieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: sizes.borderRadius,
    backgroundColor: colors.white,
  },
  searchField: {
    ...typography.text,
    flex: 1,
  },
});
