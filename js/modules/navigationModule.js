import update from "immutability-helper";
import { StatusBar } from "react-native";
import { getRouteName, screenTracker, getDeepRouteName } from "js/Services";

export const NAME = "navigation";
export const TOGGLE_APP_NAVIGATOR_TAB =
  "TOGGLE_APP_NAVIGATOR_HEADER" + " " + NAME;
export const TOGGLE_SAFE_AREA_BOTTOM = "TOGGLE_SAFE_AREA_BOTTOM" + " " + NAME;
export const UPDATE_CURRENT_ROUTE_KEY = "UPDATE_CURRENT_ROUTE_KEY" + " " + NAME;
export const TOGGLE_SAFE_AREA_TOP = "TOGGLE_SAFE_AREA_TOP" + " " + NAME;
export const TOGGLE_PORTRAIT_ORIENTATION_LOCK =
  "TOGGLE_PORTRAIT_ORIENTATION_LOCK" + " " + NAME;
export const OVERRIDE_TOGGLE_PORTRAIT_ORIENTATION_LOCK =
  "OVERRIDE_TOGGLE_PORTRAIT_ORIENTATION_LOCK" + " " + NAME;
export const TOGGLE_SAFE_AREA_BACKGROUND_COLOR =
  "TOGGLE_SAFE_AREA_BACKGROUND_COLOR" + " " + NAME;

const noAppNavigatorTab = [];

const noStatusBar = [
  "takeVideo",
  "videoFullScreen",
  "createPhoto",
  "postDetail",
  "activityDetails",
  "editProfile",
  "leDetails",

  "noteDetails"
];

const noSafeAreaTop = [];

const noSafeAreaBottom = [];

const blackBackgroundColorSafeArea = [];

const portraitOrientationLock = ["createPhoto", "takeVideo"];

export const toggleAppNavigatorTab = data => {
  return {
    type: TOGGLE_APP_NAVIGATOR_TAB,
    data: data
  };
};

export const toggleSafeAreaTop = data => {
  return {
    type: TOGGLE_SAFE_AREA_TOP,
    data: data
  };
};

export const toggleSafeAreaBackgroundColor = data => {
  return {
    type: TOGGLE_SAFE_AREA_BACKGROUND_COLOR,
    data
  };
};

export const toggleSafeAreaBottom = data => {
  return {
    type: TOGGLE_SAFE_AREA_BOTTOM,
    data: data
  };
};

export const togglePortraitOrientationLock = data => {
  return {
    type: TOGGLE_PORTRAIT_ORIENTATION_LOCK,
    data: data
  };
};

export const overrideTogglePortraitOrientationLock = data => {
  return {
    type: OVERRIDE_TOGGLE_PORTRAIT_ORIENTATION_LOCK,
    data: data
  };
};

export const updateCurrentRouteKey = data => {
  return {
    type: UPDATE_CURRENT_ROUTE_KEY,
    data: data
  };
};

export const checkAppNavigatorTab = currentScreen => {
  return (dispatch, getState) => {
    if (noAppNavigatorTab.indexOf(currentScreen) != -1) {
      dispatch(toggleAppNavigatorTab(false));
    } else {
      dispatch(toggleAppNavigatorTab(true));
    }
  };
};

export const checkBackgroundColorSafeArea = currentScreen => {
  return (dispatch, getState) => {
    if (blackBackgroundColorSafeArea.indexOf(currentScreen) != -1) {
      dispatch(toggleSafeAreaBackgroundColor("#000"));
    } else {
      dispatch(toggleSafeAreaBackgroundColor("#fff"));
    }
  };
};

export const checkSafeAreaBottom = currentScreen => {
  return (dispatch, getState) => {
    if (noSafeAreaBottom.indexOf(currentScreen) != -1) {
      dispatch(toggleSafeAreaBottom(false));
    } else {
      dispatch(toggleSafeAreaBottom(true));
    }
  };
};

export const checkSafeAreaTop = currentScreen => {
  return (dispatch, getState) => {
    if (noSafeAreaTop.indexOf(currentScreen) != -1) {
      dispatch(toggleSafeAreaTop(false));
    } else {
      dispatch(toggleSafeAreaTop(true));
    }
  };
};

export const checkStatusBar = currentScreen => {
  return (dispatch, getState) => {
    if (noStatusBar.indexOf(currentScreen) != -1) {
      //StatusBar.setHidden(true);
      setTimeout(function() {
        StatusBar.setHidden(true);
      });
      //SafeAreaView.setStatusBarHeight(0);
      //dispatch(toggleSafeAreaTop(false));
    } else {
      //StatusBar.setHidden(false);
      setTimeout(function() {
        StatusBar.setHidden(false);
      });
      //SafeAreaView.setStatusBarHeight(0);
      //dispatch(toggleSafeAreaTop(true));
    }
  };
};

export const checkPortraitLock = currentScreen => {
  return (dispatch, getState) => {
    if (portraitOrientationLock.indexOf(currentScreen) != -1) {
      dispatch(togglePortraitOrientationLock(false));
    } else {
      dispatch(togglePortraitOrientationLock(true));
    }
  };
};

export const screenChange = (prevState, currentState, reduxKey) => {
  return (dispatch, getState) => {
    const shallowCurrentScreen = getRouteName(currentState);
    let params = {};
    params[reduxKey] = shallowCurrentScreen;
    dispatch(updateCurrentRouteKey(params));
    const currentScreen = getDeepRouteName(
      shallowCurrentScreen,
      getState().navigation.currentRouteKey
    );

    dispatch(checkAppNavigatorTab(currentScreen));
    dispatch(checkStatusBar(currentScreen));
    dispatch(checkSafeAreaTop(currentScreen));
    dispatch(checkSafeAreaBottom(currentScreen));
    dispatch(checkPortraitLock(currentScreen));
    dispatch(checkBackgroundColorSafeArea(currentScreen));
    // dispatch(screenTracker(currentScreen));
  };
};

const REDUCER_HANDLERS = {
  [TOGGLE_APP_NAVIGATOR_TAB]: (state, action) => {
    return update(state, { showAppNavigatorTab: { $set: action.data } });
  },
  [TOGGLE_SAFE_AREA_TOP]: (state, action) => {
    return update(state, { showSafeAreaTop: { $set: action.data } });
  },
  [TOGGLE_SAFE_AREA_BOTTOM]: (state, action) => {
    return update(state, { showSafeAreaBottom: { $set: action.data } });
  },
  [TOGGLE_PORTRAIT_ORIENTATION_LOCK]: (state, action) => {
    return update(state, { lockPotrait: { $set: action.data } });
  },
  [OVERRIDE_TOGGLE_PORTRAIT_ORIENTATION_LOCK]: (state, action) => {
    return update(state, { overrideLockPotrait: { $set: action.data } });
  },
  [UPDATE_CURRENT_ROUTE_KEY]: (state, action) => {
    let params = action.data;
    Object.keys(params).map((key, index) => {
      state = update(state, {
        currentRouteKey: { [key]: { $set: params[key] } }
      });
    });
    return state;
  },
  [TOGGLE_SAFE_AREA_BACKGROUND_COLOR]: (state, action) => {
    return update(state, { safeAreaBackgroundColor: { $set: action.data } });
  }
};

const initialState = {
  showAppNavigatorTab: true,
  currentRouteKey: {
    app: "course",
    course: null,
    activity: null,
    weeklyScheduler: null,
    more: null,
    root: null
  },
  showSafeAreaTop: true,
  showSafeAreaBottom: false,
  lockPotrait: true,
  overrideLockPotrait: false,
  safeAreaBackgroundColor: "#fff"
};

//export default initialState;
export default function myReducer(state = initialState, action) {
  const handler = REDUCER_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
