import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const CrossIcon: React.FC<IconProps> = ({ width = 16, height = 16, color = "#000000" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.70711 0.707107C2.09763 0.316582 2.7308 0.316582 3.12132 0.707107L8 5.58579L12.8787 0.707107C13.2692 0.316582 13.9024 0.316582 14.2929 0.707107C14.6834 1.09763 14.6834 1.7308 14.2929 2.12132L9.41421 7L14.2929 11.8787C14.6834 12.2692 14.6834 12.9024 14.2929 13.2929C13.9024 13.6834 13.2692 13.6834 12.8787 13.2929L8 8.41421L3.12132 13.2929C2.7308 13.6834 2.09763 13.6834 1.70711 13.2929C1.31658 12.9024 1.31658 12.2692 1.70711 11.8787L6.58579 7L1.70711 2.12132C1.31658 1.7308 1.31658 1.09763 1.70711 0.707107Z"
        fill={color}
      />
    </Svg>
  );
};
