import {NavigationActions } from 'react-navigation';
import _ from 'lodash'


export const navigateOnce = (getStateForAction) => (action, state) => {
    const {type, routeName} = action;
    return (
      state &&
      type === NavigationActions.NAVIGATE &&
      routeName === state.routes[state.routes.length - 1].routeName
    ) ? state : getStateForAction(action, state);
  };
  

export const getRouteName = (navigationState) => {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    
    // dive into nested navigators
    // if (route.routes) {
    //     return getRouteName(route);
    // }
    return route.routeName;
};

export const getDeepRouteName = (currentScreen,routeKeys) => {
    if(_.has(routeKeys,currentScreen) && !!routeKeys[currentScreen]){
        return getDeepRouteName(routeKeys[currentScreen],routeKeys)
    }
    return currentScreen
}