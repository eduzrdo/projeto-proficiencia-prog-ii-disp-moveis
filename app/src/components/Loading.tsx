import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

import { colors } from "@/constants";

type LoadingProps = ActivityIndicatorProps & {
  stretch?: boolean;
};

export const Loading = ({ stretch, ...rest }: LoadingProps) => {
  return (
    <View
      style={{
        flex: stretch ? 1 : 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={colors.light[800]} {...rest} />
    </View>
  );
};
