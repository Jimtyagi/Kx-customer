import _ from "lodash";

const getString = ({ prefix, postfix }) => {
  if (prefix) {
    return !_.isEmpty(prefix) ? prefix + " " : "";
  } else if (postfix) {
    return !_.isEmpty(postfix) ? " " + postfix : "";
  }
  return "";
};

export const getCountString = ({
  count,
  singularText,
  pluralText,
  prefix,
  postfix,
  shouldShowZero
}) => {
  let outPutSrting = "";
  if (count == 0) {
    outPutSrting = `${getString({ prefix })}${
      shouldShowZero ? "0" : "No"
    } ${singularText}${getString({ postfix })}`;
  } else if (count == 1) {
    outPutSrting = `${getString({ prefix })}1 ${singularText}${getString({
      postfix
    })}`;
  } else {
    outPutSrting = `${getString({ prefix })} ${count} ${pluralText}${getString({
      postfix
    })}`;
  }

  return _.replace(outPutSrting, new RegExp("undefined", "g"), "");
};
