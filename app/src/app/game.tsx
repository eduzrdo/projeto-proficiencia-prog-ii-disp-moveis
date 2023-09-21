import { useState, useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Letter } from "@/components/Letter";
import { Face } from "@/components/Face";
import { LetterButton } from "@/components/LetterButton";

import { colors } from "@/constants";
import { letters } from "@/utils/letters";

import FlagIcon from "@/assets/svgs/flag-icon.svg";

export default function Game() {
  const [drawnWord, setDrawnWord] = useState<string[]>([]);
  const [ongoingWord, setOngoingWord] = useState<string[]>([]);
  const [mistakesCount, setMistakesCount] = useState(0);

  const navigation = useNavigation();

  const handleChooseLetter = (letter: string) => {
    if (mistakesCount === 6) return;

    const foundIndexes = drawnWord.reduce(
      (indexes: number[], element: string, index: number) => {
        if (letter === element) {
          indexes.push(index);
        }
        return indexes;
      },
      []
    );

    if (foundIndexes.length === 0) {
      setMistakesCount((previousCount) => previousCount + 1);
      return;
    }

    const newOngoingWord: string[] = [...ongoingWord];

    for (const index of foundIndexes) {
      newOngoingWord.splice(index, 1, letter);
    }

    setOngoingWord(newOngoingWord);
  };

  useEffect(() => {
    setDrawnWord("PROGRAMACAO".split(""));
    setOngoingWord(Array("PROGRAMACAO".length).fill(""));
  }, []);

  return (
    <ScreenFrame>
      <View style={styles.header}>
        <ScreenHeader hideBackButton title="Descubra a palavra" />

        <Pressable onPress={navigation.goBack} hitSlop={20}>
          <FlagIcon fill={colors.light["800"]} />
        </Pressable>
      </View>

      <View style={styles.lettersContainer}>
        {ongoingWord.map((letter, index) => (
          <Letter key={index} letter={letter} />
        ))}
      </View>

      <View style={styles.faceWrapper}>
        <Face mistakesCount={mistakesCount} />
      </View>

      <View style={styles.keyboard}>
        {letters.map((letter) => (
          <LetterButton
            key={letter}
            onPress={() => handleChooseLetter(letter)}
            letter={letter}
            colorFeedback={drawnWord.includes(letter) ? "correct" : "wrong"}
            disable={mistakesCount === 6}
          />
        ))}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lettersContainer: {
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  faceWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    paddingBottom: 20,
  },
});
