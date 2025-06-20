import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export const CheckCircleIcon: React.FC<IconProps> = ({ width = 21, height = 20, color = "#FFFFFF" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 21 20"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2669 5.66872C13.9675 5.49372 13.5856 5.60003 13.4131 5.89378L9.41625 12.8188L7.18 10.7562C6.94375 10.5062 6.54813 10.4938 6.29625 10.7313C6.04438 10.9625 6.03125 11.3625 6.2675 11.6125L9.125 14.25C9.36063 14.5 9.75625 14.5125 10.0081 14.275C10.0844 14.2062 14.4956 6.51878 14.4956 6.51878C14.6681 6.22503 14.5656 5.83747 14.2669 5.66872ZM10.5 18.75C5.6675 18.75 1.75 14.8313 1.75 10C1.75 5.16875 5.6675 1.25 10.5 1.25C15.3325 1.25 19.25 5.16875 19.25 10C19.25 14.8313 15.3325 18.75 10.5 18.75ZM10.5 0C4.9775 0 0.5 4.475 0.5 10C0.5 15.525 4.9775 20 10.5 20C16.0225 20 20.5 15.525 20.5 10C20.5 4.475 16.0225 0 10.5 0Z"
        fill={color}
      />
    </Svg>
)}
