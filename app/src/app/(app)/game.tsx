import { useState, useEffect, useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";

import { ScreenFrame } from "@/components/ScreenFrame";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Letter } from "@/components/Letter";
import { Face } from "@/components/Face";
import { LetterButton } from "@/components/LetterButton";
import { Loading } from "@/components/Loading";

import { colors, typography } from "@/constants";
import { letters } from "@/utils/letters";
import { useUser, DrawnWord } from "@/hooks/UserContext";

// import FlagIcon from "@/assets/svgs/flag-icon.svg";
import LightbulbIcon from "@/assets/svgs/lightbulb-icon.svg";
import AlarmClockIcon from "@/assets/svgs/alarm-clock-icon.svg";

const maxGameTime = 90;

export default function Game() {
  const [drawnWord, setDrawnWord] = useState<DrawnWord | null>(null);
  const [ongoingWord, setOngoingWord] = useState<string[]>([]);

  const [hitsCount, setHitsCount] = useState(0);
  const [mistakesCount, setMistakesCount] = useState(0);
  const [remainingGameTime, setRemainingGameTime] = useState(maxGameTime);
  const [gameOver, setGameOver] = useState(false);

  const { drawWord } = useUser();

  const drawNewWord = async () => {
    const result = await drawWord();

    if (result.error || !result.data) {
      return router.back();
    }

    setDrawnWord(result.data);
    setOngoingWord(Array(result.data.word.length).fill(""));
  };

  useFocusEffect(
    useCallback(() => {
      setDrawnWord(null);
      setHitsCount(0);
      setMistakesCount(0);
      setGameOver(false);
      setRemainingGameTime(maxGameTime);
      drawNewWord();
    }, [])
  );

  useEffect(() => {
    if (!gameOver || !drawnWord) return;

    (async () => {
      const gameResult = remainingGameTime === 0 || mistakesCount === 6 ? 0 : 1;

      router.push({
        pathname: "/gameResultModal",
        params: {
          gameResult,
          word: drawnWord.word,
          wordId: drawnWord.id,
          gameDuration: maxGameTime - remainingGameTime,
        },
      });
    })();
  }, [gameOver, remainingGameTime]);

  useEffect(() => {
    if (hitsCount === drawnWord?.word.length || mistakesCount === 6) {
      setGameOver(true);
    }
  }, [hitsCount, mistakesCount]);

  useEffect(() => {
    if (gameOver || !drawnWord) return;

    if (remainingGameTime === 0) {
      return setGameOver(true);
    }

    const timeout = setTimeout(() => {
      setRemainingGameTime((previousDuration) => previousDuration - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [remainingGameTime, drawnWord]);

  if (!drawnWord) {
    return (
      <ScreenFrame center>
        <Text style={typography.title}>Sorteando palavra...</Text>
        <Loading />
      </ScreenFrame>
    );
  }

  const handleChooseLetter = (letter: string) => {
    if (mistakesCount === 6) return;

    const foundIndexes = drawnWord.normalizedWord
      .split("")
      .reduce((indexes: number[], element: string, index: number) => {
        if (letter === element) {
          indexes.push(index);
        }
        return indexes;
      }, []);

    if (foundIndexes.length === 0) {
      setMistakesCount((previousCount) => previousCount + 1);
      return;
    }

    setHitsCount(
      (previousHitsCount) => previousHitsCount + foundIndexes.length
    );

    const newOngoingWord: string[] = [...ongoingWord];

    for (const index of foundIndexes) {
      newOngoingWord.splice(index, 1, letter);
    }

    setOngoingWord(newOngoingWord);
  };

  return (
    <ScreenFrame>
      <View style={styles.header}>
        <ScreenHeader hideBackButton title="Descubra a palavra" />

        {/* <Pressable onPress={router.back} hitSlop={20}>
          <FlagIcon fill={colors.light[800]} />
        </Pressable>  */}
      </View>

      <View style={styles.lettersContainer}>
        <View style={styles.tipWrapper}>
          <View style={styles.tipIconWrapper}>
            <LightbulbIcon width={16} height={16} fill={colors.white} />
          </View>
          <Text style={styles.tipText}>{drawnWord.tip}</Text>
        </View>

        <View style={styles.letterFields}>
          {ongoingWord.map((letter, index) => (
            <Letter key={index} letter={letter} />
          ))}
        </View>
      </View>

      <View style={styles.remainingTimeWrapper}>
        <View style={styles.remainingTimeContainer}>
          <AlarmClockIcon width={20} height={20} stroke={colors.white} />
          <Text style={styles.remainingTimeText}>{remainingGameTime}</Text>
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
            colorFeedback={
              drawnWord.normalizedWord.includes(letter) ? "correct" : "wrong"
            }
            disable={gameOver}
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
    gap: 16,
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
    backgroundColor: colors.primary[700],
  },
  tipText: {
    ...typography.textSemibold,
    color: colors.light[800],
  },
  letterFields: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  remainingTimeWrapper: {
    alignItems: "center",
  },
  remainingTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    borderRadius: 20,
    backgroundColor: colors.primary[700],
    width: 64,
    height: 28,
    paddingHorizontal: 8,
  },
  remainingTimeText: {
    ...typography.textSemibold,
    color: colors.white,
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
