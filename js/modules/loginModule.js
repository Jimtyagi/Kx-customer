import update from "immutability-helper";
import { setToastMsg } from "js/modules/appModule";

import { NEW_SERVER_URL } from "js/static";
import request from "superagent";
import { AsyncStorage } from "react-native";

import client from "js/apoloClient";
import _ from "lodash";
import { uploadFile } from "js/Services/UploadFile";
export const NAME = "login";
export const SET_USER_ID_IN_REDUX = "SET_USER_ID_IN_REDUX" + " " + NAME;
export const TOGGLE_LOGGED_IN_BOOLEAN = "TOGGLE_LOGGED_IN_BOOLEAN" + " " + NAME;
export const TOGGLE_IS_LOADING = "TOGGLE_IS_LOADING" + " " + NAME;
export const ADD_PUSH_TOKEN = "ADD_PUSH_TOKEN" + " " + NAME;
export const UPDATE_ACCOUNT_DETAILS = "UPDATE_ACCOUNT_DETAILS" + " " + NAME;
export const INITIALIZE_ACCOUNT_DETAILS =
  "INITIALIZE_ACCOUNT_DETAILS" + " " + NAME;
export const UPDATE_USER_DETAILS = "UPDATE_USER_DETAILS" + " " + NAME;
export const INIT_USER_DETAILS = "INIT_USER_DETAILS" + " " + NAME;
export const SET_ORGANIZATION_ID = "SET_ORGANIZATION_ID" + " " + NAME;

export const updateUserDetails = data => {
  return {
    type: UPDATE_USER_DETAILS,
    data: data
  };
};

export const setOrganizationId = data => {
  return {
    type: SET_ORGANIZATION_ID,
    data
  };
};

export const initUserDetails = () => {
  return {
    type: INIT_USER_DETAILS
  };
};

export const updateAccountDetails = data => {
  return {
    type: UPDATE_ACCOUNT_DETAILS,
    data: data
  };
};

export const initializeAccountDetails = data => {
  return {
    type: INITIALIZE_ACCOUNT_DETAILS,
    data: data
  };
};

export const setUserIdInRedux = data => {
  return {
    type: SET_USER_ID_IN_REDUX,
    data: data
  };
};

export const toggleIsLoading = data => {
  return {
    type: TOGGLE_IS_LOADING,
    data: data
  };
};

export const addPushToken = data => {
  return {
    type: ADD_PUSH_TOKEN,
    data: data
  };
};

export const setPushTokenInStore = data => {
  return (dispatch, getState) => {
    return AsyncStorage.setItem("pushToken", JSON.stringify(data))
      .then(() => {
        dispatch(addPushToken(data));
      })
      .catch(error => console.log("error!"));
  };
};

export const setUserIdInStore = data => {
  return (dispatch, getState) => {
    return AsyncStorage.setItem("userId", JSON.stringify(data))
      .then(() => {})
      .catch(error => console.log("error!"));
  };
};

export const setUserJWT = token => {
  return (dispatch, getState) => {
    return AsyncStorage.setItem("userJwt", JSON.stringify(token))
      .then(() => {})
      .catch(error => console.log("error!"));
  };
};

export const setUserId = userId => {
  return (dispatch, getState) => {
    if (!!getState().login.pushToken) {
    }
    dispatch(setUserIdInRedux(userId));
    dispatch(setUserIdInStore(userId));
  };
};

export const onSignOut = () => {
  return (dispatch, getState) => {
    dispatch(setUserId(null));

    dispatch(setUserJWT(null));
  };
};

export const addUserPreferences = params => {
  return (dispatch, getState) => {
    if (getState().app.networkConnected) {
    }
  };
};

export const createAccount = () => {
  return (dispatch, getState) => {
    if (getState().app.networkConnected) {
    } else {
      dispatch(setToastMsg("You seem to be offline"));
    }
  };
};

export const signInAccount = () => {
  return (dispatch, getState) => {
    if (getState().app.networkConnected) {
    } else {
      dispatch(setToastMsg("You seem to be offline"));
    }
  };
};

export const saveUserProfile = callback => {
  return async (dispatch, getState) => {
    if (getState().app.networkConnected) {
    }
  };
};

const REDUCER_HANDLERS = {
  [SET_USER_ID_IN_REDUX]: (state, action) => {
    return update(state, { userId: { $set: action.data } });
  },
  [TOGGLE_IS_LOADING]: (state, action) => {
    return update(state, { isLoading: { $set: action.data } });
  },
  [ADD_PUSH_TOKEN]: (state, action) => {
    return update(state, { pushToken: { $set: action.data } });
  },
  [UPDATE_ACCOUNT_DETAILS]: (state, action) => {
    let params = action.data;
    Object.keys(params).map((key, index) => {
      state = update(state, {
        accountDetails: { [key]: { $set: params[key] } }
      });
    });
    return state;
  },
  [INITIALIZE_ACCOUNT_DETAILS]: (state, action) => {
    return update(state, {
      accountDetails: { $set: initialState.accountDetails }
    });
  },
  [INIT_USER_DETAILS]: (state, action) => {
    return update(state, { user: { $set: initialState.user } });
  },
  [SET_ORGANIZATION_ID]: (state, action) => {
    return update(state, { organizationId: { $set: action.data } });
  },
  [UPDATE_USER_DETAILS]: (state, action) => {
    let params = action.data;
    Object.keys(params).map((key, index) => {
      state = update(state, { user: { [key]: { $set: params[key] } } });
    });
    return state;
  }
};

const initialState = {
  userId: null,
  isLoading: false,
  organizationId: null,
  pushToken: "",
  accountDetails: {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  },
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
    isLocalContent: false
  }
};

export default function myReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
