import { PropsWithChildren, useEffect } from "react";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { colors, sizes } from "@/constants";

export const Modal = ({ children }: PropsWithChildren) => {
  const backgroundColor = useSharedValue("rgba(0, 0, 0, 0)");
  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0);

  useEffect(() => {
    backgroundColor.value = withTiming("rgba(0, 0, 0, 0.15)", {
      duration: 300,
    });

    translateY.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });

    opacity.value = withTiming(1, { duration: 300 });
  });

  return (
    <Animated.View
      style={{
        backgroundColor,
        // backgroundColor: "rgba(0, 0, 0, 0.15)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <Animated.View
        style={{
          backgroundColor: colors.light[100],
          borderRadius: sizes.borderRadius,
          width: "100%",
          translateY,
          opacity,
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
};
