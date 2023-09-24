import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, typography } from "@/constants";

type InfoProps = {
  type: "info" | "alert";
  message: string;
};

import InfoIcon from "@/assets/svgs/info-icon.svg";
import AlertTriangleIcon from "@/assets/svgs/alert-triangle-icon.svg";

export const Info = ({ type, message }: InfoProps) => {
  const icon = {
    info: <InfoIcon width={20} height={20} fill={colors.primary[700]} />,
    alert: <AlertTriangleIcon width={20} height={20} fill={colors.wrong} />,
  };

  return (
    <View style={styles.registerInfo}>
      {icon[type]}
      <Text style={styles.registerInfoText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  registerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  registerInfoText: {
    ...typography.smallText,
    flex: 1,
    color: colors.light[600],
  },
});
