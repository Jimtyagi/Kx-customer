import React from "react";
import { colors } from "js/UIElements/colors";
import Svg, { G, Path, Circle } from "react-native-svg";

const LeftChevronSvg = props => {
  return (
    <Svg width={20} height={32}>
      <G
        scale={props.scale}
        y={props.y}
        x={props.x}
        rotate={180}
        stroke={props.stroke}
      >
        <Path
          fill={props.fill}
          d="M7.81755,31.67658a1.54606,1.54606,0,0,1,.20324-2.06833L21.36964,15.936,8.0208,2.26657a1.35215,1.35215,0,0,1,0-1.8781,1.27609,1.27609,0,0,1,1.83362,0l14.267,14.60992a1.35369,1.35369,0,0,1,0,1.878L9.85441,31.48627A1.49856,1.49856,0,0,1,7.81755,31.67658Z"
        />
      </G>
    </Svg>
  );
};

LeftChevronSvg.defaultProps = {
  scale: "0.5",
  stroke: colors.marble,
  x: "16",
  y: "12",
  fill: colors.marble
};

export default LeftChevronSvg;
