import Face1 from "@/assets/svgs/face_1.svg";
import Face2 from "@/assets/svgs/face_2.svg";
import Face3 from "@/assets/svgs/face_3.svg";
import Face4 from "@/assets/svgs/face_4.svg";
import Face5 from "@/assets/svgs/face_5.svg";
import Face6 from "@/assets/svgs/face_6.svg";

import { colors } from "@/constants";

type FaceProps = {
  mistakesCount: number;
};

const faceProps = {
  height: "100%",
  fill: colors.light["800"],
};

const faces = [
  <Face1 {...faceProps} />,
  <Face1 {...faceProps} />,
  <Face2 {...faceProps} />,
  <Face3 {...faceProps} />,
  <Face4 {...faceProps} />,
  <Face5 {...faceProps} />,
  <Face6 {...faceProps} />,
];

export const Face = ({ mistakesCount }: FaceProps) => {
  return faces[mistakesCount];
};
