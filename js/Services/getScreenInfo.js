import {HEADER_HEIGHT, TAB_BAR_HEIGHT, STATUS_BAR_HEIGHT,HEADER_PADDING_TOP} from 'js/static';
import { Dimensions } from 'react-native';

export const getHeightExcludeTabBarAndHeader = () => {
    console.log(Dimensions.get('window').height);
    return  Dimensions.get('window').height- HEADER_HEIGHT - TAB_BAR_HEIGHT - STATUS_BAR_HEIGHT;
};

export const getHeightExcludeTabBar = () => {
    return  Dimensions.get('window').height - HEADER_HEIGHT - STATUS_BAR_HEIGHT;
};

