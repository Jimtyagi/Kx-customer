import React from "react";
import { colors } from "js/UIElements/colors";
import Svg, { G, Path } from "react-native-svg";

const LeftChevronSvg = props => {
  return (
    <Svg width={props.width} height={props.height} viewBox="0 0 18 32">
      <Path
        fill={props.fill}
        d="M17.1948425,0.313000859 C17.6697001,0.951948217 17.5817464,1.84703359 16.9916025,2.38133086 L3.64275247,16.0535809 L16.9915925,29.7230109 C17.4972863,30.2469225 17.4972863,31.0771992 16.9915925,31.6011109 C16.751202,31.8494074 16.4203816,31.9895832 16.0747825,31.9895832 C15.7291833,31.9895832 15.398363,31.8494074 15.1579725,31.6011109 L0.890972472,16.9911909 C0.386141779,16.4669696 0.386141779,15.6374121 0.890972472,15.1131909 L15.1579825,0.503310859 C15.6813122,-0.0857625972 16.5714456,-0.168930456 17.1948425,0.313000859 Z"
      />
    </Svg>
  );
};

LeftChevronSvg.defaultProps = {
  fill: colors.marble,
  width: 10,
  height: 18
};

export default LeftChevronSvg;
