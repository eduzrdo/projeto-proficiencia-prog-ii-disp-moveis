import { useState } from "react";
import { TextInput, View, FlatList } from "react-native";
// import { Link } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { PlayerCard } from "@/components/PlayerCard";
// import { Button } from "@/components/Button";

import { colors } from "@/constants";

import MagnifyingGlassIcon from "@/assets/svgs/magnifying-glass-icon.svg";

type PlayerData = {
  id: string;
  playerName: string;
  rank: number;
  avatarUrl: string;
};

const player: PlayerData = {
  id: "0",
  playerName: "Nome do Jogador",
  rank: 42,
  avatarUrl: "https://avatars.githubusercontent.com/u/43072438?v=4",
};

const playerList: PlayerData[] = Array(100)
  .fill(player)
  .map((player, index) => {
    return {
      ...player,
      id: player.id + index,
    };
  });

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ScreenFrame>
      <ScreenHeader title="Melhores Jogadores" />

      <View>
        <MagnifyingGlassIcon fill={colors.light["800"]} />
        <TextInput
          placeholder="Buscar jogadores"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={playerList}
          renderItem={({ item, index }) => (
            <PlayerCard
              key={index}
              rank={item.rank}
              avatarUrl={item.avatarUrl}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingVertical: 20,
            gap: 20,
          }}
        />
      </View>
    </ScreenFrame>
  );
}
