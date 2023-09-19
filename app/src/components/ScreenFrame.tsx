import { View } from "react-native";
import { PropsWithChildren } from "react";

export const ScreenFrame = ({ children }: PropsWithChildren) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
      }}
    >
      {children}
    </View>
  );
};
