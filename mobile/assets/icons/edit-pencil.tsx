import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
};

export const EditPencilIcon: React.FC<IconProps> = ({
  width = 25,
  height = 25,
  fillColor = "white",
  strokeColor = "black",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
    >
      <Path
        d="M6.17007 18.4417L6.6138 18.2113L6.17007 18.4418C6.43368 18.9494 7.05891 19.1472 7.56655 18.8836L10.7523 17.2292C11.2032 16.9951 11.6155 16.6931 11.9748 16.3338L19.6896 8.61905C20.5822 7.72643 20.5822 6.27919 19.6896 5.38656C18.797 4.49394 17.3497 4.49394 16.4571 5.38656L8.69916 13.1445C8.41805 13.4256 8.17963 13.7464 7.99149 14.0966L6.17685 17.4743C6.01484 17.7758 6.01231 18.138 6.17007 18.4417ZM5.35714 0.5H19.6429C22.3254 0.5 24.5 2.67462 24.5 5.35714V19.6429C24.5 22.3254 22.3254 24.5 19.6429 24.5H5.35714C2.67462 24.5 0.5 22.3254 0.5 19.6429V5.35714C0.5 2.67462 2.67462 0.5 5.35714 0.5Z"
        fill={fillColor}
        stroke={strokeColor}
      />
    </Svg>
  );
};
