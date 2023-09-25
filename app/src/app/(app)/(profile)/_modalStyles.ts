import { StyleSheet } from "react-native";

import { colors, typography } from "@/constants";

export const styles = StyleSheet.create({
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
    textAlign: 'center',
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
});
