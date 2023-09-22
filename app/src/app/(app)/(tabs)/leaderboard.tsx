import { useState } from "react";
import { TextInput, View, FlatList, StyleSheet } from "react-native";
// import { Link } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { PlayerCard } from "@/components/PlayerCard";
import { Input } from "@/components/Input";
// import { Button } from "@/components/Button";

import { colors, sizes, typography } from "@/constants";

import MagnifyingGlassIcon from "@/assets/svgs/magnifying-glass-icon.svg";

type PlayerData = {
  id: number;
  playerName: string;
  rank: number;
  avatarUrl: string;
  score: number;
};

const player: PlayerData = {
  id: 1,
  playerName: "@username",
  rank: 1,
  avatarUrl: "https://avatars.githubusercontent.com/u/43072438?v=4",
  score: 153902,
};

const playerList: PlayerData[] = Array(10)
  .fill(player)
  .map((player, index) => {
    return {
      ...player,
      id: player.id + index,
      rank: player.rank + index,
    };
  });

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");

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
          data={playerList}
          renderItem={({ item, index }) => (
            <PlayerCard
              key={index}
              playerId={`ID do jogador: ${String(item.id)}`}
              rank={item.rank}
              avatarUrl={item.avatarUrl}
              playerName={item.playerName}
              score={item.score}
            />
          )}
          keyExtractor={(item) => String(item.id)}
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
