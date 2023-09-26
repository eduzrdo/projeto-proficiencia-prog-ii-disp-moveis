import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { Button } from "@/components/Button";
import { Face } from "@/components/Face";
import { Modal } from "@/components/Modal";

import { useUser } from "@/hooks/UserContext";

import { typography, colors } from "@/constants";
import { Loading } from "@/components/Loading";

export default function GameResultModal() {
  const [score, setScore] = useState<number>();

  let { gameResult, word, wordId, gameDuration } = useLocalSearchParams<{
    gameResult: string;
    word: string;
    wordId: string;
    gameDuration: string;
  }>();

  const { saveGame } = useUser();

  const parsedResult = parseInt(gameResult);

  useEffect(() => {
    (async () => {
      const result = await saveGame(
        wordId,
        parseInt(gameDuration),
        gameResult === "0" ? 0 : 1
      );

      setScore(result.data?.score);
    })();
  }, []);

  return (
    <Modal>
      {score !== undefined ? (
        <View style={styles.modalContentContainer}>
          {parsedResult === 0 ? (
            <Text style={[styles.gameResultTitle, styles.gameResultLose]}>
              Você perdeu!
            </Text>
          ) : (
            <Text style={[styles.gameResultTitle, styles.gameResultWin]}>
              Você ganhou!
            </Text>
          )}

          <View style={{ height: 100 }}>
            {parsedResult === 0 ? (
              <Face mistakesCount={6} />
            ) : (
              <Face mistakesCount={1} />
            )}
          </View>

          <View style={styles.gameStatusData}>
            <Text style={typography.subtitle}>
              <Text style={{ color: colors.light[400] }}>Resposta:</Text>{" "}
              {word.toUpperCase()}
            </Text>

            {score !== 0 && (
              <Text
                style={[typography.subtitle, { color: colors.primary[700] }]}
              >
                +{score} pontos
              </Text>
            )}
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              flex={1}
              color={colors.wrong}
              title="Sair"
              onPress={() => router.push("/")}
            />
            <Button flex={2} title="Jogar novamente" onPress={router.back} />
          </View>
        </View>
      ) : (
        <View style={{ height: 200 }}>
          <Loading stretch />
        </View>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContentContainer: {
    alignItems: "center",
    gap: 24,
    padding: 24,
  },
  modalTitle: {
    ...typography.textSemibold,
    color: colors.light[800],
    textAlign: "center",
  },
  modalDescription: {
    ...typography.smallText,
    color: colors.light[800],
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  playerUsername: {
    color: colors.wrong,
  },
  gameResultTitle: {
    ...typography.title,
    color: colors.wrong,
    padding: 8,
  },
  gameResultWin: {
    color: colors.correct,
  },
  gameResultLose: {
    color: colors.wrong,
  },
  gameStatusData: {
    alignItems: "center",
  },
});
