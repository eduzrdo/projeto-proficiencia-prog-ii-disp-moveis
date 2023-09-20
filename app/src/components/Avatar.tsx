import { Image, ImageProps } from "react-native";

import { colors, sizes } from "@/constants";

export const Avatar = ({ ...props }: ImageProps) => {
  return (
    <Image
      style={{
        width: 56,
        height: 56,
        borderRadius: sizes.borderRadius,
        backgroundColor: colors.white,
      }}
      {...props}
    />
  );
};
