import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  fillColor?: string;
};

export const TrashBinIcon: React.FC<IconProps> = ({
  width = 20,
  height = 20,
  fillColor = "#FF6E6E",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <Path
        d="M20 1.11111H15L13.5714 0H6.42857L5 1.11111H0V3.33333H20M1.42857 17.7778C1.42857 18.3671 1.72959 18.9324 2.26541 19.3491C2.80123 19.7659 3.52795 20 4.28571 20H15.7143C16.472 20 17.1988 19.7659 17.7346 19.3491C18.2704 18.9324 18.5714 18.3671 18.5714 17.7778V4.44444H1.42857V17.7778Z"
        fill={fillColor}
      />
    </Svg>
  );
};
