import update from "immutability-helper";

import _ from "lodash";

export const NAME = "shipmentDetail";

export const SELECTED_SHIPMENT_DETAIL = "SELECTED_SHIPMENT_DETAIL" + " " + NAME;

export const setSelectedShipmentDetail = data => {
  console.log("Here", data);
  return { type: SELECTED_SHIPMENT_DETAIL, data: data };
};

const REDUCER_HANDLERS = {
  [SELECTED_SHIPMENT_DETAIL]: (state, action) => {
    return update(state, { selectedShipmentDetail: { $set: action.data } });
  }
};

const initialState = {
  selectedShipmentDetail: {}
};

export default function myReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
