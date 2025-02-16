import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const BackArrowIcon: React.FC<IconProps> = ({ width = 16, height = 29, color = "#000000" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 29"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4793 0.520695C16.1736 1.21497 16.1736 2.34059 15.4793 3.03487L4.29194 14.2223L15.4793 25.4097C16.1736 26.1039 16.1736 27.2296 15.4793 27.9238C14.7851 28.618 13.6594 28.618 12.9652 27.9238L0.520695 15.4793C0.187307 15.146 0 14.6937 0 14.2223C0 13.7508 0.187307 13.2985 0.520695 12.9652L12.9652 0.520695C13.6594 -0.173565 14.7851 -0.173565 15.4793 0.520695Z"
        fill={color}
      />
    </Svg>
  );
};