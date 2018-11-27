import { AppRegistry, Platform } from "react-native";
import setup from "./js/setup";
import { Sentry } from "react-native-sentry";
import Config from "react-native-config";
//Open before release
if (!__DEV__) {
  Sentry.config(
    Platform.OS == "ios"
      ? Config.sentryConfigUrlIOS
      : Config.sentryConfigUrlAndroid,
    {
      disableNativeIntegration: true,
      deactivateStacktraceMerging: false
    }
  ).install();
}

AppRegistry.registerComponent("KlearExpress", setup);
