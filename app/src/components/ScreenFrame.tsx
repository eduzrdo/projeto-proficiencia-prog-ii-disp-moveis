import { View } from "react-native";
import { PropsWithChildren } from "react";

type ScreenFrameProps = PropsWithChildren & {
  center?: boolean;
};

export const ScreenFrame = ({ center, children }: ScreenFrameProps) => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        gap: 36,
        ...(center
          ? {
              justifyContent: "center",
              alignItems: "center",
            }
          : {}),
      }}
    >
      {children}
    </View>
  );
};
