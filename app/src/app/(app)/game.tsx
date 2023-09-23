import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useNavigation } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Letter } from "@/components/Letter";
import { Face } from "@/components/Face";
import { LetterButton } from "@/components/LetterButton";

import { colors, typography } from "@/constants";
import { letters } from "@/utils/letters";
import { useUser, DrawnWord } from "@/hooks/UserContext";
import { normalizeWord } from "@/utils/normalizeWords";

import FlagIcon from "@/assets/svgs/flag-icon.svg";
import LightbulbIcon from "@/assets/svgs/lightbulb-icon.svg";

export default function Game() {
  const [rawDrawnWord, setRawDrawnWord] = useState<DrawnWord>();
  const [drawnWord, setDrawnWord] = useState<string[]>([]);
  const [ongoingWord, setOngoingWord] = useState<string[]>([]);
  const [mistakesCount, setMistakesCount] = useState(0);

  const navigation = useNavigation();
  const { drawWord } = useUser();

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
    (async () => {
      const result = await drawWord();

      if (result.error || !result.data) {
        return router.replace("/(app)/(tabs)");
      }

      setRawDrawnWord(result.data);

      const normalizedWord = normalizeWord(result.data.word).toUpperCase();

      setDrawnWord(normalizedWord.split(""));
      setOngoingWord(Array(normalizedWord.length).fill(""));
    })();
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
        <View style={styles.tipWrapper}>
          <View style={styles.tipIconWrapper}>
            <LightbulbIcon width={16} height={16} fill={colors.white} />
          </View>
          <Text style={styles.tipText}>{rawDrawnWord?.tip}</Text>
        </View>

        <View style={styles.letterFields}>
          {ongoingWord.map((letter, index) => (
            <Letter key={index} letter={letter} />
          ))}
        </View>
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
    gap: 20,
  },
  tipWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  tipIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary["600"],
  },
  tipText: {
    ...typography.textSemibold,
    color: colors.light["800"],
  },
  letterFields: {
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
