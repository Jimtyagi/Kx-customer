import update from "immutability-helper";

import _ from "lodash";

export const NAME = "app";
export const IS_NETWORK_CONNECTED = "IS_NETWORK_CONNECTED" + " " + NAME;
export const SET_TOAST_MSG = "SET_TOAST_MSG" + " " + NAME;
export const CLEAR_TOAST_MSG = "CLEAR_TOAST_MSG" + " " + NAME;

export const isNetworkConnected = data => {
  return { type: IS_NETWORK_CONNECTED, data: data };
};

export const setToastMsg = data => {
  return { type: SET_TOAST_MSG, payload: data };
};

export function clearToast() {
  return { type: CLEAR_TOAST_MSG };
}

const REDUCER_HANDLERS = {
  [IS_NETWORK_CONNECTED]: (state, action) => {
    return update(state, { networkConnected: { $set: action.data } });
  },
  [SET_TOAST_MSG]: (state, action) => {
    if (action.payload !== null && typeof action.payload === "object") {
      return Object.assign({}, state, {
        toastMsg: action.payload.msg,
        showToast: true
      });
    } else {
      return Object.assign({}, state, {
        toastMsg: action.payload,
        toastPosition: "toast-bottom-right",
        showToast: true
      });
    }
  },
  [CLEAR_TOAST_MSG]: (state, action) => {
    return Object.assign({}, state, { showToast: false });
  }
};

const initialState = {
  networkConnected: true,
  toastMsg: "",
  showToast: false
};

//export default initialState;
export default function myReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
