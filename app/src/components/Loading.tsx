import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";

import { colors } from "@/constants";

type LoadingProps = ActivityIndicatorProps & {
  stretch?: boolean;
};

export const Loading = ({ stretch, color, ...rest }: LoadingProps) => {
  return (
    <View
      style={{
        flex: stretch ? 1 : 0,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator
        size="large"
        color={color ?? colors.primary[700]}
        {...rest}
      />
    </View>
  );
};
