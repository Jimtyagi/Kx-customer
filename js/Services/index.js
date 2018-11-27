import generateRandomId from "./generateRandomId";

import { getCountString } from "./getCountString";
import { normalizeFonts } from "./normalizeFonts";

import { getRouteName, getDeepRouteName, navigateOnce } from "./getRouteInfo";
import {
  getHeightExcludeTabBarAndHeader,
  getHeightExcludeTabBar
} from "./getScreenInfo";

import { validateEmail } from "./validateEmail";
import { isIphoneX } from "./isIphoneX";

//exports.customizeAttachmentObject = customizeAttachmentObject;
exports.generateRandomId = generateRandomId;

exports.getDeepRouteName = getDeepRouteName;
exports.getRouteName = getRouteName;
exports.getHeightExcludeTabBarAndHeader = getHeightExcludeTabBarAndHeader;

exports.navigateOnce = navigateOnce;

exports.validateEmail = validateEmail;

exports.isIphoneX = isIphoneX;

exports.getCountString = getCountString;
exports.normalizeFonts = normalizeFonts;
