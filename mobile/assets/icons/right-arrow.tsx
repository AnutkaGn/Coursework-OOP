import React from "react";
import Svg, { Path } from "react-native-svg";

type IconProps = {
  width?: number;
  height?: number;
  fillColor?: string;
};

export const RightArrowIcon: React.FC<IconProps> = ({
  width = 8,
  height = 16,
  fillColor = "black",
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 8 16"
      fill="none"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.260334 14.8507C-0.0867787 14.5036 -0.0867787 13.9408 0.260333 13.5936L5.85403 7.99995L0.260332 2.40625C-0.0867798 2.05914 -0.0867798 1.49629 0.260332 1.14918C0.607444 0.802068 1.17029 0.802068 1.5174 1.14918L7.73965 7.37142C7.90635 7.53809 8 7.76422 8 7.99995C8 8.23569 7.90635 8.46182 7.73965 8.62849L1.5174 14.8507C1.17029 15.1979 0.607446 15.1979 0.260334 14.8507Z"
        fill={fillColor}
      />
    </Svg>
  );
};
