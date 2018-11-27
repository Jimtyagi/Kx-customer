import React from "react";
import Svg, { G, Path } from "react-native-svg";

const CarrierShipIconSvg = props => {
  return (
    <Svg height={props.height} width={props.width} viewBox="0 0 20 14">
      <G stroke="none" strokeWidth="1" fill={props.fill} fillRule="evenodd">
        <Path
          d="M19.7845588,7.27523483 L17.7019372,7.27523483 C17.5778708,7.27523483 17.4747421,7.37916767 17.4747421,7.50421967 L17.4747421,7.64956352 C17.4747421,7.85742922 17.3095884,8.02388806 17.1033433,8.02388806 L6.8533717,8.02388806 C6.6471307,8.02388806 6.4819729,7.85743337 6.4819729,7.64956352 L6.4819729,4.49021285 L4.33747895,4.49021285 L4.33747895,3.78380208 L6.4819729,3.78380208 L6.4819729,3.11879815 C6.4819729,2.95234346 6.33776507,2.80699961 6.1726114,2.80699961 L6.0694909,2.80699961 C5.94542456,2.80699961 5.84229581,2.70306677 5.84229581,2.57801477 L5.84229581,2.14116423 C5.84229581,1.97470954 5.71822947,1.85048484 5.55388839,1.85048484 L5.05923997,1.85048484 C4.8940863,1.85048484 4.77083255,1.97552853 4.77083255,2.14116423 L4.77083255,2.57801477 C4.77083255,2.70305845 4.66771205,2.80699961 4.54363746,2.80699961 L4.44051696,2.80618686 C4.31645062,2.80618686 4.21332187,2.70225401 4.21332187,2.57720201 L4.21332187,0.290679385 C4.21332187,0.124224696 4.08925553,0 3.92491445,0 L3.47134924,0 C3.30619557,0 3.18294182,0.125043686 3.18294182,0.290679385 L3.18294182,2.57720201 C3.18294182,2.7022457 3.07982132,2.80618686 2.95574673,2.80618686 L2.72855164,2.80618686 C2.56339797,2.80618686 2.41919014,2.95153071 2.41919014,3.1179854 L2.41919014,6.88077018 C2.41919014,7.08863587 2.25403647,7.25509472 2.04779134,7.25509472 L0.315697107,7.25509472 C0.130401941,7.25509472 -0.0347476048,7.42154941 0.00633560292,7.62941926 L0.872383028,13.1792254 C0.913470361,13.4496171 1.14066132,13.6363636 1.38798554,13.6363636 L15.7006982,13.6363636 C15.8859934,13.6363636 16.051143,13.5535416 16.1341343,13.4073788 L19.9495929,7.62850465 C20.0736592,7.4831608 19.9495929,7.27529926 19.7844392,7.27529926 L19.7845588,7.27523483 Z M3.69776061,10.6432827 C3.38839911,10.6432827 3.12012081,10.372891 3.12012081,10.0610924 C3.12012081,9.74929388 3.38839911,9.47890219 3.69776061,9.47890219 C4.00712211,9.47890219 4.27540041,9.74929388 4.27540041,10.0610924 C4.27540041,10.372891 4.0280762,10.6432827 3.69776061,10.6432827 Z M7.41009866,10.6432827 C7.10073716,10.6432827 6.83245886,10.372891 6.83245886,10.0610924 C6.83245886,9.74929388 7.10073716,9.47890219 7.41009866,9.47890219 C7.71946017,9.47890219 7.98773846,9.74929388 7.98773846,10.0610924 C7.96759903,10.372891 7.71946017,10.6432827 7.41009866,10.6432827 Z M10.5866226,10.6432827 C10.2772611,10.6432827 10.0089828,10.372891 10.0089828,10.0610924 C10.0089828,9.74929388 10.2772611,9.47890219 10.5866226,9.47890219 C10.8959841,9.47890219 11.1642624,9.74929388 11.1642624,10.0610924 C11.1642624,10.372891 10.8959841,10.6432827 10.5866226,10.6432827 Z M13.7623216,10.6432827 C13.45296,10.6432827 13.1846817,10.372891 13.1846817,10.0610924 C13.1846817,9.74929388 13.45296,9.47890219 13.7623216,9.47890219 C14.0716831,9.47890219 14.3399614,9.74929388 14.3399614,10.0610924 C14.3399614,10.372891 14.0716831,10.6432827 13.7623216,10.6432827 Z"
          fillRule="nonzero"
        />
      </G>
    </Svg>
  );
};

CarrierShipIconSvg.defaultProps = {
  fill: "white",
  height: 20,
  width: 14
};

export default CarrierShipIconSvg;