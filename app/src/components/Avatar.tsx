import { Image, ImageProps } from "react-native";

import { colors, sizes } from "@/constants";

type AvatarProps = ImageProps & {
  size?: "big" | "small";
};

export const Avatar = ({ size = "small", ...props }: AvatarProps) => {
  const avatarsize =
    size === "small"
      ? {
          width: 56,
          height: 56,
        }
      : {
          width: 96,
          height: 96,
        };

  return (
    <Image
      style={{
        ...avatarsize,
        borderRadius: sizes.borderRadius,
        backgroundColor: colors.white,
      }}
      {...props}
    />
  );
};
