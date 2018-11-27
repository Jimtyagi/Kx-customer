import React from "react";
import PropTypes from "prop-types";
import Svg, { G, Path } from "react-native-svg";

const MoreItemIconSvg = props => {
  return (
    <Svg height={props.height} width={props.width} viewBox="0 0 18 4">
      <G
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        transform={{ translate: "-331,  -633" }}
      >
        <G transform={{ translate: "24,  626" }} fill={props.fill}>
          <Path
            d="M308.928571,11 C307.863451,11 307,10.1045695 307,9 C307,7.8954305 307.863451,7 308.928571,7 C309.993692,7 310.857143,7.8954305 310.857143,9 C310.857143,10.1045695 309.993692,11 308.928571,11 Z M316,11 C314.934879,11 314.071429,10.1045695 314.071429,9 C314.071429,7.8954305 314.934879,7 316,7 C317.065121,7 317.928571,7.8954305 317.928571,9 C317.928571,10.1045695 317.065121,11 316,11 Z M323.071429,11 C322.006308,11 321.142857,10.1045695 321.142857,9 C321.142857,7.8954305 322.006308,7 323.071429,7 C324.136549,7 325,7.8954305 325,9 C325,10.1045695 324.136549,11 323.071429,11 Z"
            id="More"
          />
        </G>
      </G>
    </Svg>
  );
};

MoreItemIconSvg.defaultProps = {
  fill: "black",
  height: 24,
  width: 24
};

export default MoreItemIconSvg;
