import { PropsWithChildren } from "react";
import { Text } from "react-native";

import { typography } from "@/constants";

export const Title = ({ children }: PropsWithChildren) => {
  return <Text style={typography.title}>{children}</Text>;
};
